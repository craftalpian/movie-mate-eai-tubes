"use client";

import { useState } from "react";
import CityOption from "./_components/city-option";
import { getAllCity } from "./_hooks/cities";
import { getAllMovie } from "./_hooks/movies";
import MovieList from "./_components/movie-list";
import MovieCardModal from "./_components/movie-card-modal";

const Home = () => {
  const { data: moviesData, isLoading: moviesLoading } = getAllMovie();
  const { data: citiesData, isLoading: citiesLoading } = getAllCity();

  const [selectedCity, setSelectedCity] = useState(0);

  if (moviesLoading || citiesLoading) return <div />;
  return (
    <>
      <div className="pb-8 pt-20 px-6 overflow-y-auto h-full">
        <CityOption cityList={citiesData} index={selectedCity} />
        <MovieList
          moviesData={moviesData}
          onClick={(movie) =>
            (document.getElementById("movieDetail") as any).showModal()
          }
        />
      </div>
      <dialog id="movieDetail" className="modal modal-middle">
        {/* <div className="modal-box"> */}
        {/* <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p> */}
        <MovieCardModal />

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
        {/* <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div> */}
        {/* </div> */}
      </dialog>
    </>
  );
};

export default Home;
