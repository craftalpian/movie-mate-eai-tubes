import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IConfigState {
  movie_id: null | string;
}

const initialState: IConfigState = {
  movie_id: null,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setMovieId: (state, action: PayloadAction<string | null>) => {
      state.movie_id = action.payload;
    },
  },
});

export const { setMovieId } = configSlice.actions;
export const configReducer = configSlice.reducer;
