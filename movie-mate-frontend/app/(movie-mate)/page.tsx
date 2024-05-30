import MovieCard from "./_components/movie-card";

const Home = () => {
  return (
    <div className="pb-8 pt-24 px-6 overflow-y-auto h-full">
      <div className="space-y-4">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
};

export default Home;
