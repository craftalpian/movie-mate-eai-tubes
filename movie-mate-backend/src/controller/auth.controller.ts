import { Request, Response } from "express";
import { ApiService, AuthService } from "../service";

const authService = new AuthService();
const apiService = new ApiService();

// login igracias
const login = async (req: Request, res: Response) => {
  try {
    const { username, password, client_id } = req?.body;
    const apiData = await apiService.apiDetail(client_id);
    if (!apiData) throw new Error("client_id not found");
    const igraciasData = await authService.login({
      username,
      password,
      client_id,
    });
    return res.status(200).json({
      data: { ...igraciasData, api_owner: apiData?.owner_name || "-" },
      success: true,
      message: "Berhasil Masuk",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error?.message || "Bermasalah",
      success: false,
    });
  }
};

// check igracias
const detail = async (req: Request, res: Response) => {
  try {
    const { client_id }: any = req?.query;
    let { cookie } = req?.headers;
    cookie = decodeURIComponent(cookie?.split("igracias=")[1] || "");
    if (!cookie || !client_id) throw new Error("Data kurang lengkap");
    const apiData = await apiService.apiDetail(client_id);
    if (!apiData) throw new Error("client_id not found");
    const igraciasData = await authService.detail({
      cookie,
    });
    return res.status(200).json({
      data: { ...igraciasData, api_owner: apiData?.owner_name || "-" },
      success: true,
      message: "Berhasil Mengambil Data",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error?.message || "Bermasalah",
      success: false,
    });
  }
};

export { login, detail };
