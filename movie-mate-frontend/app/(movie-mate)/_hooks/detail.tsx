"use client";

import axios from "axios";
import { useQuery } from "react-query";
import { parseCookies } from "nookies";
import { useAppDispatch } from "../_lib/store";
import { setNim } from "../_lib/reducer/config.reducer";

export const getUser = () => {
  const cookies = parseCookies();
  const dispatch = useAppDispatch();
  return useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `/backend/auth?client_id=o8auyha97d87hadias`,
          {
            headers: {
              cookie: cookies?.igracias,
            },
          }
        );
        dispatch(setNim(data?.data?.nim));
        return data?.data;
      } catch (error) {}
    },
    queryKey: ["GetUser", cookies, cookies?.igracias],
    enabled: !!cookies,
  });
};
