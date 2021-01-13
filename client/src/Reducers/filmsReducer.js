import { FETCH_FILMS } from "../Actions/filmsActions";

const initialState = {
  oldal: 1,
  nev: "",
  kategoria: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_FILMS:
      return {
        ...state,
        params,
      };
  }
}
