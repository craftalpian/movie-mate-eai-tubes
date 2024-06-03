"use client";

import axios from "axios";
import { useQuery } from "react-query";
import { useAppSelector } from "../_lib/store";
import { delay, indonesianTimestamp } from "../_utils";

export const getAllSchedule = () => {
  const configState = useAppSelector((state) => state);
  return useQuery({
    queryFn: async () => {
      await delay(500);
      const { data } = await axios.get(
        `/backend/schedule?movie_theater_id=${
          configState?.movie_theater_id ?? ""
        }&start_timestamp=${indonesianTimestamp().format(
          "YYYY-MM-DD"
        )}T00:00:00.00Z`
      );
      return data?.data;
    },
    queryKey: ["GetAllSchedule", configState?.movie_theater_id],
    enabled: !!configState?.movie_theater_id,
  });
};
