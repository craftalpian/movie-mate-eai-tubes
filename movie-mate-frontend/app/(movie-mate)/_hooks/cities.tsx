"use client";

import axios from "axios";
import { useQuery } from "react-query";
import { useAppDispatch } from "../_lib/store";
import { setCities } from "../_lib/reducer/config.reducer";

export const useAllCity = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get("/backend/city");
      dispatch(setCities(data?.data));
    },
    queryKey: ["GetAllCity"],
  });
};
