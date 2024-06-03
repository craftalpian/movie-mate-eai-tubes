"use client";

import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { parseCookies } from "nookies";
import { getAllSchedule } from "./schedule";

export const watchMovie = () => {
  const { refetch: refetchSchedule } = getAllSchedule();
  const cookies = parseCookies();

  return useMutation({
    mutationFn: async ({ schedule_id }: { schedule_id: string }) => {
      try {
        const { data } = await axios.post(
          `/backend/schedule/${schedule_id}`,
          {},
          {
            headers: {
              cookie: cookies?.igracias,
            },
          }
        );
        refetchSchedule();

        return data?.data;
      } catch (error: any) {
        if (error instanceof AxiosError) {
          return {
            success: false,
            message: error?.response?.data?.message,
          };
        }

        return {
          success: false,
          message: "Gagal",
        };
      }
    },
    mutationKey: ["WatchMovie"],
  });
};
