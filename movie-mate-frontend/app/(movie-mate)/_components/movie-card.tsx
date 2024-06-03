"use client";
import clsx from "clsx";
// import { useAppSelector } from "../_lib/store";
// import { createFavourite } from "../_hooks/add-favourite";
// import { deleteFavourite } from "../_hooks/remove-favourite";

const MovieCard = ({
  title,
  imageUrl,
  synopsis,
  onClickMovie,
  movieId,
  type,
  isLike = false,
  totalLike = 0,
}: {
  isLike?: boolean;
  totalLike?: number;
  title: string;
  imageUrl: string;
  movieId: string;
  type: string;
  onClickMovie: (movie: string) => void;
  synopsis?: string | null;
}) => {
  return (
    <div
      onClick={() => onClickMovie(movieId)}
      className="card w-full bg-base-100 shadow-xl hover:border hover:shadow-2xl cursor-pointer relative"
    >
      <button
        className={clsx("btn absolute top-0 right-0 bg-glass mt-2 mr-2")}
        
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill={"currentcolor"}
          viewBox="0 0 24 24"
          stroke={"currentcolor"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        {totalLike > 0 ? totalLike : ""}
      </button>
      <img
        src={imageUrl}
        alt={title}
        className="aspect-square object-cover bg-gray-400 rounded-t-2xl"
        height={78}
      />
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{`${synopsis?.substring(0, 80)}...` || "-"}</p>
        <div className="card-actions justify-end mt-2">
          {type?.split(",")?.map((type: string) => (
            <div className="badge badge-outline">{type.trim()}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
