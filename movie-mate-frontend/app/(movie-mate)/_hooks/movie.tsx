"use client";

import axios from "axios";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../_lib/store";
import { setMovie } from "../_lib/reducer/config.reducer";

export const getMovie = () => {
  const { movie_id } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`/backend/movie/${movie_id}`);
      dispatch(setMovie(data?.data));
    },
    queryKey: ["GetMovie", movie_id],
  });
};
