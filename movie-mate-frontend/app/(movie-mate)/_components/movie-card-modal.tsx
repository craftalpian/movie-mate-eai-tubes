"use client";

import { useAppSelector } from "../_lib/store";
import moment from "moment-timezone";
import { formatToRupiah } from "../_utils";

const MovieCardModal = ({ isLoading }: { isLoading: boolean }) => {
  const configState = useAppSelector((state) => state);
  moment.tz.setDefault("Asia/Jakarta");
  const today = moment().format("dddd");

  return (
    <div
      onClick={() => {}}
      className="modal-box bg-base-100 shadow-xl mx-6 p-0 max-w-sm"
    >
      <button className="btn absolute top-0 right-0 bg-glass mt-2 mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
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
          {isLoading ? <div className="skeleton h-8 w-40"></div> : configState?.movie?.title}
        </h2>
        <p className="text-left mb-4">
          {isLoading ? <div className="skeleton h-16 w-64"></div> : configState?.movie?.synopsis}
        </p>
        {!isLoading && (
          <>
            {(configState?.theaters || [])?.map(
              ({ theater_name, weekday_price, weekend_price, theater_id }) => (
                <div className="collapse collapse-arrow bg-base-200 outline-none" key={theater_id}>
                  <input type="checkbox" name="my-accordion-2" />
                  <div className="collapse-title text-xl font-medium capitalize">
                    🎥 {theater_name} <br />
                    <div className="badge badge-neutral">
                      {["Sunday", "Saturday"]?.includes(today)
                        ? formatToRupiah(weekend_price)
                        : formatToRupiah(weekday_price)}
                    </div>
                  </div>
                  <div className="collapse-content mt-0">
                    <div className="divider mt-0"></div>

                    <div className="collapse bg-base-300">
                      <input type="checkbox" name="my-accordion-1" />
                      <div className="collapse-title text-xl font-medium">
                        ⏰ Jam 21.15
                        <button className="btn btn-sm disabled self-end ml-2">
                          Normal
                        </button>
                      </div>
                      <div className="collapse-content">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-10 h-10">
                              <img
                                src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">Hart Hagerty</div>
                            <div className="text-sm opacity-50">
                              United States
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-block mt-4">
                          Ikut Nonton!
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieCardModal;
