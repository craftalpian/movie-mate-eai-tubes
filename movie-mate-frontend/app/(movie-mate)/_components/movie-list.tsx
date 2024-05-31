import MovieCard from "./movie-card";

const MovieList = ({
  moviesData,
  onClick,
}: {
  moviesData: any[];
  onClick: (movie: string) => void;
}) => {
  return (
    <div className="space-y-8">
      {moviesData?.map(
        ({ title, image_url, synopsis, movie_id }: any, index: number) => (
          <MovieCard
            imageUrl={image_url}
            title={title}
            synopsis={synopsis}
            key={index}
            movieId={movie_id}
            onClickMovie={(movieId) => onClick(movieId)}
          />
        )
      )}
    </div>
  );
};

export default MovieList;
