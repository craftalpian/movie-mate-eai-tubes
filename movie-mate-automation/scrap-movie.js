const { unescape } = require("querystring");

(async () => {
  const axios = require("axios");
  const { PrismaClient } = require("@prisma/client");
  const { id, crypt, token: generateToken } = require("./utils");
  const sanitize = require("sanitize-html");
  const { escape } = require("html-escaper");
  const prisma = new PrismaClient();

  const cities = await prisma.city.findMany({
    select: {
      city: true,
      name: true,
    },
  });

  const token = await generateToken();

  console.log({ token });

  for (const { city, name } of cities) {
    const { data } = await axios.post(
      "https://21cineplex.com/script/ajax-home-nowplaying.php",
      new URLSearchParams({
        data: "getMovNowplaying",
        city_id: city,
        token,
      }),
      {
        headers: {
          Host: "21cineplex.com",
          Cookie:
            "PHPSESSID=1tl2ghiml826jbq1ec62vfk9qd; __utmc=117930442; _ga=GA1.1.1673893937.1716613439; __utmz=117930442.1716916617.2.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __gads=ID=61c40be93b2854a4:T=1716613440:RT=1716948017:S=ALNI_MZSbq9fttkfYT4RrUK9gtK1Z6Izyw; __gpi=UID=00000e2c37a1eb43:T=1716613440:RT=1716948017:S=ALNI_MbZdUnftAaIWPYdo4nOcEQ-2_LPWw; __eoi=ID=9367ecd2e2f9811b:T=1716613440:RT=1716948017:S=AA-AfjYDd7QjLWlL7PZs1YfcFAGv; __utma=117930442.1673893937.1716613439.1716945226.1716948017.4; _ga_9834QGKCP2=GS1.1.1716948015.4.1.1716948019.0.0.0; kota=81",
          "sec-ch-ua":
            '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          accept: "*/*",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "x-requested-with": "XMLHttpRequest",
          "sec-ch-ua-mobile": "?0",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
          "sec-ch-ua-platform": '"macOS"',
          origin: "https://21cineplex.com",
          "sec-fetch-site": "same-origin",
          "sec-fetch-mode": "cors",
          "sec-fetch-dest": "empty",
          referer: "https://21cineplex.com/",
          "accept-language": "en-US,en;q=0.9",
          priority: "u=1, i",
        },
      }
    );

    const movieList = data?.msg.replace(/[\t\r\n\\]/g, "");
    for (const movie of movieList?.split('<div class="col-3">')) {
      const movieUrl =
        (movie.split('<a href="')[1] ?? "").split('">')[0]?.trim() ?? "";
      const movieName =
        (movie.split("<h4 >")[1] ?? "").split("</h4>")[0].trim() ?? "";
      const movieCategoryUrl =
        (movie.split('<span class="movie-label"><img src="')[1] ?? "")
          .split('"')[0]
          .trim() ?? "";
      const movieCategory = movieCategoryUrl
        ? (
            movie.split(
              `<span class="movie-label"><img src="${movieCategoryUrl}" alt="`
            )[1] ?? ""
          )
            .split('"')[0]
            .trim()
        : "" ?? "";
      const movieImageUrl = `https://media.21cineplex.com${(movie.split(`media.21cineplex.com`)[1] ?? "").split('"')[0].trim() ?? ""}`

      console.log({
        movieUrl,
        movieName,
        movieCategory,
        movieCategoryUrl,
        movieImageUrl,
      });
    }

    // console.log(response.data);
  }
})();
