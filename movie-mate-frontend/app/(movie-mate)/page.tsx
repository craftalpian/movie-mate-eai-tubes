"use client";

import { useState } from "react";
import CityOption from "./_components/city-option";
import MovieCard from "./_components/movie-card";
import { getAllCity } from "./_hooks/cities";
import { getAllMovie } from "./_hooks/movies";

const Home = () => {
  const { data: moviesData, isLoading: moviesLoading } = getAllMovie();
  const { data: citiesData, isLoading: citiesLoading } = getAllCity();

  const [selectedCity, setSelectedCity] = useState(0)

  if (moviesLoading || citiesLoading) return <div />;
  return (
    <div className="pb-8 pt-20 px-6 overflow-y-auto h-full">
      <CityOption cityList={citiesData} index={selectedCity} />
      <div className="space-y-8">
        {moviesData?.map(
          ({ title, image_url, synopsis }: any, index: number) => (
            <MovieCard
              imageUrl={image_url}
              title={title}
              synopsis={synopsis}
              key={index}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
