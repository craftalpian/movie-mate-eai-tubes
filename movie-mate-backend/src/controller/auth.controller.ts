import { Request, Response } from "express";
import { AuthService } from "../service";

const authService = new AuthService();

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req?.body;
    console.log({ username, password });
    await authService.login({ username, password });
    return res.json({ data: {} });
  } catch (error) {
    console.error({ error });
  }
};

export { login };
