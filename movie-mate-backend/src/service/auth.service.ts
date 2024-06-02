import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { load } from "cheerio";

class AuthService {
  private prismaClient;
  private headers;
  private jar = new CookieJar();
  private axiosClient = wrapper(axios.create({ jar: this.jar }));

  constructor() {
    this.prismaClient = new PrismaClient();
    this.headers = {
      Host: "igracias.telkomuniversity.ac.id",
      "Cache-Control": "max-age=0",
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

  async login({ password, username }: { username: string; password: string }) {
    const mainUrl = "https://igracias.telkomuniversity.ac.id/";
    await this.axiosClient.get(mainUrl, {
      headers: this.headers,
    });
    const cookieString = await this.jar?.getSetCookieStrings(mainUrl);
    const cookie = `${cookieString.join("; ")};`;

    if (!cookieString) throw new Error("Cookie tidak ditemukan");

    const { data } = await axios.post(
      mainUrl,
      new URLSearchParams({
        textUsername: username,
        textPassword: password,
        submit: "Login",
      }),
      {
        headers: {
          Cookie: `${cookie}`,
          ...this.headers,
        },
      }
    );

    const $ = load(data);
    const nim = $("title").text().split("\n")[1].split(" ")[0];

    if (nim === "i-GRACIAS") throw new Error("Gagal masuk");

    const { data: userData } = await axios.get(
      "https://igracias.telkomuniversity.ac.id/index.php?pageid=2941",
      {
        headers: {
          Cookie: `${cookie}`,
          ...this.headers,
        },
      }
    );
    const fullname = userData
      .split('<h5 class="centered" style="margin-bottom:5px !important;">')[1]
      .split("</h5>")[0]
      .replace("\r\n", "")
      .trim();
    const email = userData
      .split("Email Anda</b></span>")[1]
      .split("</span>")[0]
      .split(">")[1]
      .trim();

    return {
      full_name: fullname,
      email,
      nim,
    };
  }
}

export default AuthService;
