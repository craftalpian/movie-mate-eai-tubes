"use client";

import axios from "axios";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../_lib/store";
import { setMovie } from "../_lib/reducer/config.reducer";

export const useMovie = () => {
  const configState = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `/backend/movie/${configState?.movie_id}`
      );
      dispatch(setMovie(data?.data));
    },
    queryKey: ["GetMovie", configState?.movie_id],
    enabled: !!configState?.movie_id,
  });
};
