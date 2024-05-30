const MovieCard = ({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) => (
  <div className="card w-full bg-base-100 shadow-xl">
    <img
      src={imageUrl}
      alt={title}
      className="aspect-square object-cover bg-gray-400 rounded-t-2xl"
      height={78}
    />
    <div className="card-body">
      <h2 className="card-title">
        {title}
        <div className="badge badge-secondary">NEW</div>
      </h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div className="card-actions justify-end">
        <div className="badge badge-outline">Fashion</div>
        <div className="badge badge-outline">Products</div>
      </div>
    </div>
  </div>
);

export default MovieCard;
