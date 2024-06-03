"use client";

import axios from "axios";
import { parseCookies } from "nookies";
import { useMutation } from "react-query";
import { getAllSchedule } from "./schedule";

export const createFavourite = () => {
  const cookies = parseCookies();
  const { refetch: refetchSchedule } = getAllSchedule();
  return useMutation({
    mutationFn: async ({ movie_id }: { movie_id: string }) => {
      const { data } = await axios.post(
        `/backend/movie/${movie_id}/favourite`,
        {},
        {
          headers: {
            cookie: cookies?.igracias,
          },
        }
      );
      refetchSchedule();
      return data;
    },
    mutationKey: ["AddFavourite"],
  });
};
