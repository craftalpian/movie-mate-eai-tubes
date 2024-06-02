"use client";

import axios from "axios";
import { useQuery } from "react-query";
import { parseCookies, setCookie, destroyCookie } from "nookies";

export const getUser = () => {
  const cookies = parseCookies();
  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `/backend/auth?client_id=o8auyha97d87hadias`,
        {
          headers: {
            cookie: cookies?.igracias,
          },
        }
      );

      return data?.data
    },
    queryKey: ["GetUser", cookies, cookies?.igracias],
    enabled: !!cookies,
  });
};
