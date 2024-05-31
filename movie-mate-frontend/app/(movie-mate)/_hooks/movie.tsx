"use client";

import axios from "axios";
import { useQuery } from "react-query";
import { useAppSelector } from "../_lib/store";

export const getMovie = () => {
  const { movie_id } = useAppSelector((state) => state);

  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`/backend/movie/${movie_id}`);
      return data?.data;
    },
    queryKey: ["GetMovie", movie_id],
    enabled: !!movie_id,
  });
};
