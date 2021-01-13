import React from "react";
import axios from "axios";
import { stringify } from "querystring";

export default function LoadFilms(props) {
  if (props.loading === true) {
    return (
      <div className="d-flex justify-content-center">
        <div
          className="spinner-border"
          role="status"
          style={{ width: "8rem", height: "8rem", margin: "10vh" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else if (props.films === undefined) {
    return (
      <h2 className="alert alert-danger">
        Nincs a keresésnek megfelelő torrent
      </h2>
    );
  } else {
    return props.films.map((element, index) => (
      <div key={index}>
        <div className="card text-center">
          <div className="card-header">
            {element.title_hun === "NoTitle"
              ? element.title_eng
              : element.title_hun}
          </div>
          <div className="card-body">
            <div className="card-title">
              {element.title_eng === "placeholder"
                ? "Tartalom betöltése"
                : element.title_eng}
            </div>
            <div className="container-fluid">
              <a
                target="_blank"
                href={element.link_imdb}
                className="btn btn-primary"
              >
                A film Imdb-n
              </a>
              <button
                onClick={() =>
                  axios
                    .post(
                      "/api/download",
                      stringify({ link: element.link_torrent })
                    )
                    .then((res) =>
                      res.status === 200
                        ? console.log("Sikeres")
                        : console.log("Failed")
                    )
                }
                className="btn btn-primary"
                style={{ marginLeft: "20px" }}
              >
                Letöltés
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  }
}
