"use client";

import axios from "axios";
import { parseCookies } from "nookies";
import { useMutation } from "react-query";
import { getAllSchedule } from "./schedule";
import { getAllMovie } from "./movies";
import { getMovie } from "./movie";

export const deleteFavourite = () => {
  const cookies = parseCookies();
  const { refetch: refetchSchedule } = getAllSchedule();
  const { refetch: refetchMovies } = getAllMovie();
  const { refetch: refetchMovie } = getMovie();
  return useMutation({
    mutationFn: async ({ movie_id }: { movie_id: string }) => {
      const { data } = await axios.delete(
        `/backend/movie/${movie_id}/favourite`,
        {
          headers: {
            cookie: cookies?.igracias,
          },
        }
      );
      refetchSchedule();
      refetchMovies();
      refetchMovie();
      return data;
    },
    mutationKey: ["RemoveFavourite"],
  });
};
