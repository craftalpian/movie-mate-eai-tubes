(async () => {
  const axios = require("axios");
  const { PrismaClient } = require("@prisma/client");
  const { id, crypt, token: generateToken } = require("./utils");
  const prisma = new PrismaClient();

  const { data: listTheater } = await axios.get(
    "https://21cineplex.com/theaters",
    {
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
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "navigate",
        "sec-fetch-user": "?1",
        "sec-fetch-dest": "document",
        referer:
          "https://21cineplex.com/theaters/daftar-bioskop-21-di-tangerang,35.htm",
        "accept-language": "en-US,en;q=0.9",
      },
    }
  );

  const splitTheaterCity = listTheater
    .replace(/[\t\r\n\\]/g, "")
    .split(
      '<select class="custom-select" id="cityChanged" onchange="window.location=this.options[this.selectedIndex].value">'
    )[1]
    .split("</select>")[0]
    .split("<option");

  for (const cityTheater of splitTheaterCity) {
    const cityId = (cityTheater.split('data-id="')[1] ?? "")
      .split('"')[0]
      .trim();
    const cityTheaterUrl = (cityTheater.split('value="')[1] ?? "")
      .split('"')[0]
      .trim();
    const city = (cityTheater.split(">")[1] ?? "").split("<")[0].trim();

    if (cityId.length > 0) {
      // Update city
      const { city_id } = await prisma.city.upsert({
        create: {
          city_id: id("city"),
          city: cityId,
          name: city,
          city_url: cityTheaterUrl,
        },
        update: {
          name: city,
          city_url: cityTheaterUrl,
        },
        where: {
          city: cityId,
        },
      });

      let { data: specificCityData } = await axios.get(cityTheaterUrl, {
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
          "sec-fetch-site": "same-origin",
          "sec-fetch-mode": "navigate",
          "sec-fetch-user": "?1",
          "sec-fetch-dest": "document",
          referer:
            "https://21cineplex.com/theaters/daftar-bioskop-21-di-singkawang,87.htm",
          "accept-language": "en-US,en;q=0.9",
          priority: "u=0, i",
        },
      });

      specificCityData = specificCityData.replace(/[\t\r\n\\]/g, "");
      const theaterList = specificCityData
        .split('<tbody id="tableXXI">')[1]
        .split("</tbody>")[0]
        .split("<tr>");

      // console.log({ theaterList });
      for (const theater of theaterList) {
        const theaterUrl = (theater.split('<a href="')[1] ?? "")
          .split('"')[0]
          .trim();
        const theaterName = (theater.split('.htm">')[1] ?? "")
          .split("<")[0]
          .trim();

        const key = await crypt(theaterName);

        if (theaterUrl.length > 0 && theater.length > 0) {
          await prisma.theater.upsert({
            create: {
              city_id,
              name: theaterName,
              theater_id: id("theater"),
              theater_url: theaterUrl,
              theater_key: key,
            },
            update: {
              city_id,
              name: theaterName,
              theater_url: theaterUrl,
            },
            where: {
              theater_key: key,
            },
          });

          console.log(`${theaterName} => ${theaterUrl}`);
        }
      }
    }
  }
})();
