"use client";

import moment from "moment";
import "moment-timezone";
import { useAppSelector } from "../_lib/store";

const CityOption = ({ onClick }: { onClick: (cityId: string) => void }) => {
  moment.locale("id");
  const jakartaTime = moment.tz("Asia/Jakarta");
  const configState = useAppSelector((state) => state);

  const cities = (configState?.cities ?? [])?.filter(({ name }) =>
    ["BANDUNG", "JAKARTA", "DEPOK"].includes(name)
  );

  return (
    <div className="flex flex-row w-full justify-between items-center mb-4">
      <h2 className="card-title">{jakartaTime.format("LL")}</h2>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1">
          {configState.city_id
            ? `${
                cities?.filter(
                  ({ city_id }: { city_id: string }) =>
                    city_id === configState.city_id
                )[0]?.name
              } 🔽`
            : "Pilih Kota 🔽"}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {cities?.map(({ city_id, name }) => (
            <li key={city_id} onClick={() => onClick(city_id)}>
              <a className="capitalize">{name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CityOption;
