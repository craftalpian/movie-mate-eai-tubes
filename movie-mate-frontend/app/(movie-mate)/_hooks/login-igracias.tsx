"use client";

import axios from "axios";
import { useMutation } from "react-query";

export const loginIgracias = () => {
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const { data } = await axios.post("/backend/auth/login", {
        username,
        password,
      });

      return data?.data;
    },
    mutationKey: ["Login"],
  });
};
