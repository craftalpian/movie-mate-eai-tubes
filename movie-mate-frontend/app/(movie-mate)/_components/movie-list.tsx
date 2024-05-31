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
      {moviesData?.map(({ title, image_url, synopsis }: any, index: number) => (
        <MovieCard
          imageUrl={image_url}
          title={title}
          synopsis={synopsis}
          key={index}
          onClickMovie={(movieId) => onClick(movieId)}
        />
      ))}
    </div>
  );
};

export default MovieList;
