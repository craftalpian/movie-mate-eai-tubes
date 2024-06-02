import { Request, Response } from "express";
import { AuthService } from "../service";

const authService = new AuthService();

const login = async (req: Request, res: Response) => {
  try {
    await authService.login();
    return res.json({ data: {} });
  } catch (error) {}
};

export { login };
