"use client";

import CityOption from "./_components/city-option";
import MovieCard from "./_components/movie-card";
import { getAllCity } from "./_hooks/cities";
import { getAllMovie } from "./_hooks/movies";

const Home = () => {
  const { data: moviesData, isLoading: moviesLoading } = getAllMovie();
  const { data: citiesData, isLoading: citiesLoading } = getAllCity();

  if (moviesLoading || citiesLoading) return <div />;
  return (
    <div className="pb-8 pt-20 px-6 overflow-y-auto h-full">
      <CityOption cityList={citiesData} index={null} />
      <div className="space-y-8">
        {moviesData?.map(
          (
            { title, image_url }: { title: string; image_url: string },
            index: number
          ) => (
            <MovieCard imageUrl={image_url} title={title} key={index} />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
