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
        ({
          title,
          image_url,
          synopsis,
          movie_id,
          type,
          total_favourite,
        }: any) => (
          <MovieCard
            imageUrl={image_url}
            title={title}
            synopsis={synopsis}
            key={movie_id}
            movieId={movie_id}
            type={type}
            onClickMovie={(movieId) => onClick(movieId)}
            totalLike={total_favourite}
          />
        )
      )}
    </div>
  );
};

export default MovieList;
