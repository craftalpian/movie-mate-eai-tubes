(async () => {
  const axios = require("axios");
  const { PrismaClient } = require("@prisma/client");
  const {
    id,
    crypt,
    token: generateToken,
    timestampFormat,
  } = require("./utils");
  const sanitize = require("sanitize-html");
  const cheerio = require("cheerio");
  const prisma = new PrismaClient();

  const theaters = await prisma.theater.findMany({
    select: {
      theater_id: true,
      theater_url: true,
    },
  });

  for (const { theater_id, theater_url } of theaters) {
    let { data } = await axios.get(theater_url, {
      headers: {
        Host: "21cineplex.com",
        "sec-ch-ua":
          '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "upgrade-insecure-requests": "1",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "sec-fetch-site": "none",
        "sec-fetch-mode": "navigate",
        "sec-fetch-user": "?1",
        "sec-fetch-dest": "document",
        "accept-language": "en-US,en;q=0.9",
        priority: "u=0, i",
      },
    });
    data = data.replace(/[\t\r\n\\]/g, "");

    const theaterAddress = data
      .split('<div class="address-cinema-block" id="address">')[1]
      .split("<br>")[0]
      .trim()
      .replace(/<div>|<\/div>|\n|<br>/g, " ")
      .trim();
    const regex = /Rp\d{1,3}(?:\.\d{3})*/g;
    const listPrice = data
      .split('id="divhtm">')[1]
      .split("<div class=")[0]
      .trim()
      .match(regex);
    const listMovieNowShowing = (
      data?.split('<div class="list-movies" id="xxi">')[1] ?? ""
    )
      .split('id="selecTicket">')[0]
      .trim()
      .split('<div class="list-movie-detail">');

    // Update theater address
    await prisma.theater.update({
      data: {
        address: theaterAddress,
      },
      where: {
        theater_id,
      },
    });

    for (const listMovie of listMovieNowShowing) {
      const movieName = (listMovie.split("<h3>")[1] ?? "")
        .split("</h3>")[0]
        .trim();
      const movieCrypt = await crypt(movieName);

      const movie = await prisma.movie.findFirst({
        where: {
          key: movieCrypt,
        },
        select: {
          movie_id: true,
        },
      });

      const movieId = movie?.movie_id || "";

      if (movieName.length > 0 && movieId.length > 0) {
        const movieTheaterKey = await crypt(`${theater_id}${movieId}`);
        const { movie_theater_id } = await prisma.movie_theater.upsert({
          create: {
            movie_theater_id: id("movie_theater"),
            movie_id: movieId,
            theater_id: theater_id,
            weekday_price: parseInt(
              listPrice[0].replace("Rp", "").replace(".", "")
            ),
            weekend_price: parseInt(
              listPrice[listPrice.length - 1].replace("Rp", "").replace(".", "")
            ),
            key: movieTheaterKey,
          },
          update: {
            movie_id: movieId,
            theater_id: theater_id,
            weekday_price: parseInt(
              listPrice[0].replace("Rp", "").replace(".", "")
            ),
            weekend_price: parseInt(
              listPrice[listPrice.length - 1].replace("Rp", "").replace(".", "")
            ),
          },
          where: {
            key: movieTheaterKey,
          },
        });

        const scheduleTime = `${
          (listMovie.split('<ul class="time-cinema">')[1] ?? "").split(
            "</ul>"
          )[0]
        }</ul>`;

        const $ = cheerio.load(scheduleTime);
        const times = [];
        $(".time-cinema-theater li a").each((index, element) => {
          const time = $(element).text();
          times.push(time);
        });

        for (const time of times) {
          const formatTime = timestampFormat(time);
          const scheduleKey = await crypt(`${formatTime}${movie_theater_id}`);
          await prisma.schedule.upsert({
            create: {
              start_timestamp: timestampFormat(time),
              start_time: time,
              schedule_id: id("schedule"),
              schedule_key: scheduleKey,
              movie_theater_id,
            },
            update: {
              start_timestamp: timestampFormat(time),
              start_time: time,
              movie_theater_id,
            },
            where: {
              schedule_key: scheduleKey,
            },
          });
        }
      }
    }
  }
})();
