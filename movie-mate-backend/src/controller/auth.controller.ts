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
    const igraciasData = await authService.login({ username, password });
    return res.status(200).json({
      data: igraciasData,
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

export { login };
