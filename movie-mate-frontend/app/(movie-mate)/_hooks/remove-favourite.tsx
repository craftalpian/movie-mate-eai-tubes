"use client";

import axios from "axios";
import { parseCookies } from "nookies";
import { useMutation } from "react-query";
import { useAllSchedule } from "./schedule";
import { useAllMovie } from "./movies";
import { useMovie } from "./movie";

export const useDeleteFavourite = () => {
  const cookies = parseCookies();
  const { refetch: refetchSchedule } = useAllSchedule();
  const { refetch: refetchMovies } = useAllMovie();
  const { refetch: refetchMovie } = useMovie();
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
