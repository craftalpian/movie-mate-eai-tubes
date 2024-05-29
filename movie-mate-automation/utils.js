const randomstring = require("randomstring");
const axios = require("axios");
const md5 = require("crypto-js/md5");

const id = (prefix) => `${prefix}_${randomstring.generate(20)}`;

const token = async () => {
  const response = await axios.get("https://21cineplex.com/", {
    headers: {
      Host: "21cineplex.com",
      Cookie:
        "PHPSESSID=1tl2ghiml826jbq1ec62vfk9qd; __utmc=117930442; _ga=GA1.1.1673893937.1716613439; __utmz=117930442.1716916617.2.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __gads=ID=61c40be93b2854a4:T=1716613440:RT=1716948017:S=ALNI_MZSbq9fttkfYT4RrUK9gtK1Z6Izyw; __gpi=UID=00000e2c37a1eb43:T=1716613440:RT=1716948017:S=ALNI_MbZdUnftAaIWPYdo4nOcEQ-2_LPWw; __eoi=ID=9367ecd2e2f9811b:T=1716613440:RT=1716948017:S=AA-AfjYDd7QjLWlL7PZs1YfcFAGv; __utma=117930442.1673893937.1716613439.1716945226.1716948017.4; _ga_9834QGKCP2=GS1.1.1716948015.4.1.1716948019.0.0.0; kota=56",
      "cache-control": "max-age=0",
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
        "https://21cineplex.com/theater/bioskop-transmart-buah-batu-xxi,416,BDGTRBB.htm",
      "accept-language": "en-US,en;q=0.9",
      priority: "u=0, i",
    },
  });

  return response?.data.split('token: "')[1].split('"')[0];
};

const crypt = async (string) => {
  const md5Bytes = await md5(string);
  return md5Bytes.toString();
};

module.exports = {
  id,
  token,
  crypt,
};
