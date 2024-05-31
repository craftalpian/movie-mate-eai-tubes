"use client";

import { useEffect, useState } from "react";
import CityOption from "./_components/city-option";
import { getAllCity } from "./_hooks/cities";
import { getAllMovie } from "./_hooks/movies";
import MovieList from "./_components/movie-list";
import MovieCardModal from "./_components/movie-card-modal";
import { getMovie } from "./_hooks/movie";
import { useAppDispatch, useAppSelector } from "./_lib/store";
import { setMovieId } from "./_lib/reducer/config.reducer";

const Home = () => {
  const [selectedCity, setSelectedCity] = useState(0);
  const dispatch = useAppDispatch();
  const { data: moviesData, isLoading: moviesLoading } = getAllMovie();
  const { data: citiesData, isLoading: citiesLoading } = getAllCity();
  const {
    data: movieData,
    isLoading: isLoadingMovieData,
    refetch,
  } = getMovie();

  if (moviesLoading || citiesLoading) return <div />;

  return (
    <>
      <div className="pb-8 pt-20 px-6 overflow-y-auto h-full">
        <CityOption cityList={citiesData} index={selectedCity} />
        <MovieList
          moviesData={moviesData}
          onClick={(movieId) => {
            dispatch(setMovieId(movieId));
            refetch();
            (document.getElementById("movieDetail") as any).showModal();
          }}
        />
      </div>
      <dialog id="movieDetail" className="modal modal-middle">
        <MovieCardModal
          isLoading={isLoadingMovieData}
          title={movieData?.title}
          imageUrl={movieData?.image_url}
          synopsis={movieData?.synopsis}
        />
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Home;
