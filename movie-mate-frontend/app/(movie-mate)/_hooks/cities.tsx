"use client";

import axios from "axios";
import { useQuery } from "react-query";

export const getAllCity = () =>
  useQuery({
    queryFn: async () => {
      const { data } = await axios.get("/backend/city");
      return data?.data;
    },
    queryKey: ["GetAllCity"],
  });
