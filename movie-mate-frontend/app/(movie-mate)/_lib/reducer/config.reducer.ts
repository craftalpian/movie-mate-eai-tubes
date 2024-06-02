import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IConfigState {
  movie_id: null | string;
  city_id: null | string;
  movie_theater_id: null | string;
  movies: any[] | null;
  theaters: any[] | null;
  cities: any[] | null;
  movie: any | null;
}

const initialState: IConfigState = {
  movie_id: null,
  city_id: null,
  movie_theater_id: null,
  movies: null,
  theaters: null,
  cities: null,
  movie: null,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setMovieId: (state, action: PayloadAction<string | null>) => {
      state.movie_id = action.payload;
    },
    setCityId: (state, action: PayloadAction<string | null>) => {
      state.city_id = action.payload;
    },
    setMovies: (state, action: PayloadAction<any[] | null>) => {
      state.movies = action.payload;
    },
    setTheaters: (state, action: PayloadAction<any[] | null>) => {
      state.theaters = action.payload;
    },
    setCities: (state, action: PayloadAction<any[] | null>) => {
      state.cities = action.payload;
    },
    setMovie: (state, action: PayloadAction<any | null>) => {
      state.movie = action.payload;
    },
    setMovieTheaterId: (state, action: PayloadAction<any | null>) => {
      state.movie_theater_id = action.payload;
    },
  },
});

export const {
  setMovieId,
  setCityId,
  setMovies,
  setTheaters,
  setCities,
  setMovie,
  setMovieTheaterId,
} = configSlice.actions;
export const configReducer = configSlice.reducer;
