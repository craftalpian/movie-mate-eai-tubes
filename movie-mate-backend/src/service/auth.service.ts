import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { load } from "cheerio";
import { encode, decode } from "js-base64";
import { delay } from "../utils";

class AuthService {
  private prismaClient;
  private headers;

  constructor() {
    this.prismaClient = new PrismaClient();
    this.headers = {
      Host: "igracias.telkomuniversity.ac.id",
      // "Cache-Control": "max-age=0",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "sec-ch-ua":
        '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "Upgrade-Insecure-Requests": "1",
      Origin: "https://igracias.telkomuniversity.ac.id",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-User": "?1",
      "Sec-Fetch-Dest": "document",
      Referer: "https://igracias.telkomuniversity.ac.id/",
      "Accept-Language": "en-US,en;q=0.9",
    };
  }

  async detail({ cookie }: { cookie: string }) {
    const igraciasUser = await this.prismaClient.igracias.findFirst({
      where: {
        cookie,
      },
      select: {
        client_id: true,
        nim: true,
      },
    });

    if (!igraciasUser) throw new Error("Akun tidak ditemukan");
    const { nim } = igraciasUser;
    let cookieNew = decode(cookie);

    const { data: userData } = await axios.get(
      "https://igracias.telkomuniversity.ac.id/index.php?pageid=2941",
      {
        headers: {
          Cookie: `${cookieNew}`,
          ...this.headers,
        },
      }
    );
    const fullName = (
      userData?.split(
        '<h5 class="centered" style="margin-bottom:5px !important;">'
      )[1] || ""
    )
      .split("</h5>")[0]
      .replace("\r\n", "")
      .trim();
    if (fullName.length < 1) return { nim: null };
    const email = (userData?.split("Email Anda</b></span>")[1] || "")
      .split("</span>")[0]
      .split(">")[1]
      .trim();
    const imageUrl = (userData?.split('<img class="" src="')[1] || "")
      .split('"')[0]
      ?.trim();

    await this.prismaClient.igracias.update({
      data: {
        email,
        full_name: fullName,
        image_url: imageUrl,
      },
      where: {
        nim,
      },
    });

    return {
      full_name: fullName,
      email,
      image_url: imageUrl,
      nim,
      cookie,
    };
  }

  async login({
    password,
    username,
    client_id,
  }: {
    username: string;
    password: string;
    client_id: string;
  }) {
    const mainUrl = "https://igracias.telkomuniversity.ac.id/";
    const { headers } = await axios.get(mainUrl, {
      headers: this.headers,
    });
    const cookieString = headers?.["set-cookie"] || [];
    const cookie = `${cookieString.join("; ")};`;

    if (!cookieString) throw new Error("Cookie tidak ditemukan");

    axios.post(
      mainUrl,
      new URLSearchParams({
        textUsername: username,
        textPassword: password,
        submit: "Login",
      }),
      {
        headers: {
          cookie,
          ...this.headers,
        },
        validateStatus: function (status) {
          return (status >= 200 && status < 300) || status === 500; // Menganggap status 500 sebagai sukses
        },
      }
    );

    const { data: userData } = await axios.get(
      "https://igracias.telkomuniversity.ac.id/index.php?pageid=2941",
      {
        headers: {
          Cookie: `${cookie}`,
          ...this.headers,
        },
      }
    );

    const $ = load(userData);
    const nim = $("title").text().split("\n")[1].split(" ")[0];

    if (nim === "i-GRACIAS") throw new Error("Gagal masuk");

    const fullName = userData
      .split('<h5 class="centered" style="margin-bottom:5px !important;">')[1]
      .split("</h5>")[0]
      .replace("\r\n", "")
      .trim();
    const email = userData
      .split("Email Anda</b></span>")[1]
      .split("</span>")[0]
      .split(">")[1]
      .trim();
    const imageUrl = userData
      .split('<img class="" src="')[1]
      .split('"')[0]
      ?.trim();

    await this.prismaClient.igracias.upsert({
      create: {
        client_id,
        cookie: encode(cookie),
        email,
        full_name: fullName,
        image_url: imageUrl,
        nim,
      },
      update: {
        client_id,
        cookie: encode(cookie),
        email,
        full_name: fullName,
        image_url: imageUrl,
      },
      where: {
        nim,
      },
    });

    return {
      full_name: fullName,
      email,
      nim,
      image_url: imageUrl,
      cookie: encode(cookie),
    };
  }
}

export default AuthService;
