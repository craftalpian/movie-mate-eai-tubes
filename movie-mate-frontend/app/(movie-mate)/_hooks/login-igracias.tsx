"use client";

import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({
      username,
      password,
      client_id,
    }: {
      username: string;
      password: string;
      client_id: string;
    }) => {
      try {
        const { data } = await axios.post("/backend/auth/login", {
          username,
          password,
          client_id,
        });

        return data?.data;
      } catch (error: any) {
        if (error instanceof AxiosError) {
          return {
            success: false,
            message: error?.response?.data?.message,
          };
        }

        return {
          success: false,
          message: "Gagal",
        };
      }
    },
    mutationKey: ["Login"],
  });
};
