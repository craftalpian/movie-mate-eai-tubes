"use client";

import moment from "moment";
import "moment-timezone";

const CityOption = ({
  cityList,
  index,
}: {
  cityList: any[];
  index: number | null;
}) => {
  moment.locale("id");
  const jakartaTime = moment.tz("Asia/Jakarta");

  const cities = (cityList ?? [])?.filter(({ name }) =>
    ["BANDUNG", "JAKARTA", "DEPOK"].includes(name)
  );

  return (
    <div className="flex flex-row w-full justify-between items-center mb-4">
      <h2 className="card-title">{jakartaTime.format("LL")}</h2>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1">
          {typeof index == "number" ? `${cities[index]?.name} 🔽` : "Pilih Kota 🔽"}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {cities?.map(({ city_id, city, name }) => (
            <li key={city_id}>
              <a className="capitalize">{name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CityOption;
