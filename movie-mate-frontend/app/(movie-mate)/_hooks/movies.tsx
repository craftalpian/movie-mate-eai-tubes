"use client";

import axios from "axios";
import { useQuery } from "react-query";

export const getAllMovie = () =>
  useQuery({
    queryFn: async () => {
      const { data } = await axios.get("/backend/movie");
      return data?.data;
    },
    queryKey: ["GetAllMovie"],
  });
