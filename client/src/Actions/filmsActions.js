import { FETCH_FILMS } from "./types";
import stringify from "stringify";

export const fetchFilms = (oldal, nev, kategoria) => (dispatch) => {
  fetch
    .post(
      `/api/torrent`,
      stringify({
        oldal,
        nev,
        kategoria,
      })
    )
    .then((films) => {
      dispatch({
        type: FETCH_FILMS,
        payload: films,
      });
    })
    .catch(console.log);
};
