"use client";

import axios from "axios";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../_lib/store";
import { setMovies } from "../_lib/reducer/config.reducer";

export const getAllMovie = () => {
  const configState = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `/backend/movie?city_id=${configState?.city_id ?? ""}`
      );
      dispatch(setMovies(data?.data));
    },
    queryKey: ["GetAllMovie", configState?.city_id],
    enabled: !!configState?.city_id,
  });
};
