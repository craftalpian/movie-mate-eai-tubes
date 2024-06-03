"use client";

import clsx from "clsx";
import { getAllSchedule } from "../_hooks/schedule";
import { watchMovie } from "../_hooks/watch-movie";
import { setMovieTheaterId } from "../_lib/reducer/config.reducer";
import { useAppDispatch, useAppSelector } from "../_lib/store";
import { formatToRupiah, indonesianTimestamp } from "../_utils";
import { createFavourite } from "../_hooks/add-favourite";
import { deleteFavourite } from "../_hooks/remove-favourite";

const MovieCardModal = ({ isLoading }: { isLoading: boolean }) => {
  const configState = useAppSelector((state) => state);
  const today = indonesianTimestamp().format("dddd");
  const dispatch = useAppDispatch();
  const { refetch: refetchSchedule, data: dataSchedule } = getAllSchedule();
  const { mutateAsync: createWatchMovie } = watchMovie();
  const { mutateAsync: favourite } = createFavourite();
  const { mutateAsync: unfavourite } = deleteFavourite();

  return (
    <div
      onClick={() => {}}
      className="modal-box bg-base-100 shadow-xl mx-6 p-0 max-w-sm"
    >
      <button
        className="btn absolute top-0 right-0 bg-glass mt-2 mr-2"
        onClick={async () => {
          if (configState?.movie?.favourite_by_me) {
            await unfavourite({ movie_id: configState?.movie_id || "" });
          } else {
            await favourite({ movie_id: configState?.movie_id || "" });
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill={configState?.movie?.favourite_by_me ? "#ff5861" : "currentcolor"}
          stroke={configState?.movie?.favourite_by_me ? "#ff5861" : "currentcolor"}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        {configState?.movie?.total_favourite > 0 ? configState?.movie?.total_favourite : ""}
      </button>
      {isLoading ? (
        <div className="aspect-square object-cover bg-gray-400 rounded-t-2xl w-full h-72 skeleton" />
      ) : (
        <img
          src={configState?.movie?.image_url || ""}
          alt={configState?.movie?.title || "-"}
          className="aspect-square object-cover bg-gray-400 rounded-t-2xl w-full"
          height={78}
        />
      )}
      <div className="card-body px-4">
        <h2 className="card-title">
          {isLoading ? (
            <div className="skeleton h-8 w-40"></div>
          ) : (
            configState?.movie?.title
          )}
        </h2>
        <p className="text-left mb-4">
          {isLoading ? (
            <div className="skeleton h-16 w-64"></div>
          ) : (
            configState?.movie?.synopsis
          )}
        </p>
        {!isLoading && (
          <>
            {(configState?.theaters || [])?.map(
              ({
                theater_name,
                weekday_price,
                weekend_price,
                theater_id,
                movie_theater_id,
              }) => {
                const todayPrice = ["Sunday", "Saturday"]?.includes(today)
                  ? weekend_price
                  : weekday_price;
                return (
                  <div
                    className="collapse collapse-arrow bg-base-200 outline-none"
                    key={theater_id}
                    onClick={() => {
                      dispatch(setMovieTheaterId(movie_theater_id));
                    }}
                  >
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium capitalize">
                      🎥 {theater_name} <br />
                      <div className="badge badge-neutral">
                        🎫 {formatToRupiah(todayPrice)}
                      </div>
                    </div>
                    <div className="collapse-content mt-0">
                      <div className="divider mt-0"></div>

                      {isLoading ||
                        (!dataSchedule && (
                          <div className="flex items-center justify-center">
                            <span className="loading loading-spinner loading-lg"></span>
                          </div>
                        ))}
                      <div className="space-y-4">
                        {!isLoading &&
                          dataSchedule &&
                          dataSchedule?.map(
                            ({ start_time, mates, schedule_id }: any) => (
                              <div className="collapse bg-base-300">
                                <input type="radio" name="my-accordion-1" />
                                <div className="collapse-title text-xl font-medium flex flex-row">
                                  <h1>⏰ Jam {start_time}</h1>
                                  {mates?.length > 0 && (
                                    <div className="inline-flex space-x-2">
                                      <button className="btn btn-xs disabled self-end ml-2">
                                        👤 {mates?.length}
                                      </button>
                                      <button className="btn btn-xs disabled self-end">
                                        💰{" "}
                                        {formatToRupiah(
                                          mates?.length * todayPrice
                                        ).replace(".000", "")}
                                        K
                                      </button>
                                    </div>
                                  )}
                                </div>
                                <div className="collapse-content">
                                  {mates?.length > 0 &&
                                    mates?.map(
                                      ({ image_url, full_name, nim }: any) => (
                                        <div className="flex items-center gap-3">
                                          <div className="avatar">
                                            <div className="mask mask-squircle w-10 h-10">
                                              <img
                                                src={image_url}
                                                alt={full_name}
                                              />
                                            </div>
                                          </div>
                                          <div>
                                            <div className="font-bold">
                                              {full_name}{" "}
                                              {nim === configState?.nim && "❇️"}
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  {mates?.filter(
                                    ({ nim }: any) => nim == configState?.nim
                                  )?.length < 1 && (
                                    <button
                                      className={clsx(
                                        "btn btn-block mt-4",
                                        !configState?.nim && "btn-disabled"
                                      )}
                                      onClick={async () => {
                                        await createWatchMovie({ schedule_id });
                                      }}
                                    >
                                      {!configState?.nim
                                        ? "Harap masuk!"
                                        : mates?.length > 0
                                        ? "Ikut Nonton!"
                                        : "Gas Nonton!"}
                                    </button>
                                  )}
                                </div>
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieCardModal;
