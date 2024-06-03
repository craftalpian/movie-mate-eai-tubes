"use client";

import CityOption from "./_components/city-option";
import { getAllCity } from "./_hooks/cities";
import { getAllMovie } from "./_hooks/movies";
import MovieList from "./_components/movie-list";
import MovieCardModal from "./_components/movie-card-modal";
import { getMovie } from "./_hooks/movie";
import { useAppDispatch, useAppSelector } from "./_lib/store";
import { setCityId, setMovieId } from "./_lib/reducer/config.reducer";
import { getAllTheater } from "./_hooks/theaters";
import { useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const Home = () => {
  const dispatch = useAppDispatch();
  const configState = useAppSelector((state) => state);
  const { isLoading: moviesLoading, refetch: refetchAllMovie } = getAllMovie();
  const { isLoading: citiesLoading } = getAllCity();
  const { isLoading: isLoadingMovieData, refetch: refetchMovie } = getMovie();
  const { refetch: refetchTheaters } = getAllTheater();

  useEffect(() => {
    const client = new W3CWebSocket("ws://localhost:1000");

    client.onopen = () => {
      console.log("Koneksi ke WebSocket berhasil dibuat");
    };

    client.onmessage = (message: any) => {
      console.log("Pesan dari server:", message.data);
    };

    return () => {
      client.close();
    };
  }, []);

  if (moviesLoading || citiesLoading) return <div />;

  return (
    <>
      <div className="pb-8 pt-20 px-6 overflow-y-auto h-full">
        <CityOption
          onClick={(cityId) => {
            dispatch(setCityId(cityId));
            refetchAllMovie();
          }}
        />
        {!configState?.city_id ? (
          <div className="card w-full bg-base-200 shadow-xl">
            <div className="card-body">
              <p>Suatu hari di grup WA:</p>
              <div className="divider" />
              <div className="chat chat-start">
                <div className="chat-bubble">Nonton gak?</div>
              </div>
              <div className="chat chat-end">
                <div className="chat-bubble">ayok</div>
              </div>
              <div className="chat chat-start">
                <div className="chat-bubble">Tapi nonton apa?</div>
              </div>
              <div className="chat chat-end">
                <div className="chat-bubble">
                  mending pilih
                  <br />
                  <i>
                    <b>kota dulu</b>
                  </i>{" "}
                  deh
                </div>
              </div>
            </div>
          </div>
        ) : (
          <MovieList
            moviesData={configState?.movies || []}
            onClick={(movieId) => {
              dispatch(setMovieId(movieId));
              refetchMovie();
              refetchTheaters();
              (document.getElementById("movieDetail") as any).showModal();
            }}
          />
        )}
      </div>
      <dialog id="movieDetail" className="modal modal-middle">
        <MovieCardModal isLoading={isLoadingMovieData} />
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Home;
