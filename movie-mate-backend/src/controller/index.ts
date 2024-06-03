import {
  listAllMovie,
  movieDetail,
  addFavourite,
  deleteFavourite,
} from "./movie.controller";
import { listAllCity } from "./city.controller";
import { listAllTheater } from "./theater.controller";
import { listAllSchedule, watchMovieBySchedule } from "./schedule.controller";
import { login, detail } from "./auth.controller";

export {
  listAllMovie,
  listAllCity,
  movieDetail,
  listAllTheater,
  listAllSchedule,
  login,
  detail,
  watchMovieBySchedule,
  addFavourite,
  deleteFavourite,
};
