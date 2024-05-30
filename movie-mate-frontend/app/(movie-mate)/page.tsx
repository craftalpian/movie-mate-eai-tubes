"use client";
import MovieCard from "./_components/movie-card";
import { getAllMovie } from "./_hooks/movies";

const Home = () => {
  const { data, isLoading } = getAllMovie();

  if (isLoading) return <div />;
  return (
    <div className="pb-8 pt-24 px-6 overflow-y-auto h-full">
      <div className="space-y-4">
        {data?.map(
          ({ title, image_url }: { title: string; image_url: string }, index: number) => (
            <MovieCard imageUrl={image_url} title={title} key={index} />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
