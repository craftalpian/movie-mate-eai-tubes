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

  return (
    <div className="flex flex-row w-full justify-between items-center mb-4">
      <h2 className="card-title">{jakartaTime.format("LL")}</h2>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">
          {index ? cityList[index]?.name : "Pilih Kota 🔽"}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {(cityList ?? [])
            ?.filter(({ name }) => ["BANDUNG", "JAKARTA"].includes(name))
            ?.map(({ city_id, city, name }) => (
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
