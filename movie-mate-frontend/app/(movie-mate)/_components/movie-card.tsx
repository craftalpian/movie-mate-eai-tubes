const MovieCard = ({
  title,
  imageUrl,
  synopsis,
  onClickMovie,
}: {
  title: string;
  imageUrl: string;
  onClickMovie: (movie: string) => void;
  synopsis?: string | null;
}) => (
  <div
    onClick={() => onClickMovie(title)}
    className="card w-full bg-base-100 shadow-xl hover:border hover:shadow-2xl cursor-pointer"
  >
    <img
      src={imageUrl}
      alt={title}
      className="aspect-square object-cover bg-gray-400 rounded-t-2xl"
      height={78}
    />
    <div className="card-body">
      <h2 className="card-title">
        {title}
        {/* <div className="badge badge-secondary">NEW</div> */}
      </h2>
      <p>{`${synopsis?.substring(0, 80)}...` || "-"}</p>
      <div className="card-actions justify-end">
        <div className="badge badge-outline">Fashion</div>
        <div className="badge badge-outline">Products</div>
      </div>
    </div>
  </div>
);

export default MovieCard;
