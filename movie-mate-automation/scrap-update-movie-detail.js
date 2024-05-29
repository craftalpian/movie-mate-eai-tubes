(async () => {
  const axios = require("axios");
  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();

  const movies = await prisma.movie.findMany({
    select: {
      movie_url: true,
      title: true,
      key: true,
    },
  });

  for (const { movie_url, title, key } of movies) {
    const { data } = await axios.get(movie_url, {
      headers: {
        Host: "21cineplex.com",
        Cookie:
          "PHPSESSID=1tl2ghiml826jbq1ec62vfk9qd; __utmc=117930442; _ga=GA1.1.1673893937.1716613439; __utmz=117930442.1716916617.2.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __gads=ID=61c40be93b2854a4:T=1716613440:RT=1716952367:S=ALNI_MZSbq9fttkfYT4RrUK9gtK1Z6Izyw; __gpi=UID=00000e2c37a1eb43:T=1716613440:RT=1716952367:S=ALNI_MbZdUnftAaIWPYdo4nOcEQ-2_LPWw; __eoi=ID=9367ecd2e2f9811b:T=1716613440:RT=1716952367:S=AA-AfjYDd7QjLWlL7PZs1YfcFAGv; __utma=117930442.1673893937.1716613439.1716948017.1716952367.5; kota=73; _ga_9834QGKCP2=GS1.1.1716957615.6.1.1716957616.0.0.0",
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

    const type = data?.split("Jenis Film</span>")[1].split("</li>")[0].trim();
    const producer = data?.split("Produser</span>")[1].split("</li>")[0].trim();
    const director = data
      ?.split("Sutradara</span>")[1]
      .split("</li>")[0]
      .trim();
    const writer = data?.split("Penulis</span>")[1].split("</li>")[0].trim();
    const production = data
      ?.split("Produksi</span>")[1]
      .split("</li>")[0]
      .trim();
    const cast = data?.split("Casts</span>")[1].split("</li>")[0].trim();
    const minute = parseInt(
      data?.split("</span> Minutes</div>")[0].split("<span>")[1].trim()
    );
    const trailer_url = data
      ?.split('class="videodefaultlink" data-video="')[1]
      .split('"')[0]
      .trim();
    const synopsis = data
      ?.split("<h4>SINOPSIS</h4>")[1]
      .split("</p>")[0]
      .split("<p>")[1]
      .trim();

    await prisma.movie.update({
      data: {
        cast,
        trailer_url,
        type,
        producer,
        director,
        writer,
        production,
        minute,
        synopsis,
        source_type: "automation",
      },
      where: {
        key,
      },
    });

    console.log(`=> ${title} berhasil diperbarui`);
  }
})();
