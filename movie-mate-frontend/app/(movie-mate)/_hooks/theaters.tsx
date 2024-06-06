"use client";

import axios from "axios";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../_lib/store";
import { setTheaters } from "../_lib/reducer/config.reducer";

export const useTheater = () => {
  const configState = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `/backend/theater?city_id=${configState?.city_id ?? ""}&movie_id=${
          configState?.movie_id ?? ""
        }`
      );
      dispatch(setTheaters(data?.data));
    },
    queryKey: ["GetAllTheater", configState?.city_id, configState?.movie_id],
  });
};
