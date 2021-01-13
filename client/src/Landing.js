import React, { Component } from "react";
import Axios from "axios";
import { stringify } from "querystring";
import LoadFilms from "./LoadFilms.js";
import { connect } from "react-redux";
import { fetchFilms } from "./Actions/filmsActions";

class Landing extends Component {
  state = {
    filmek: {},
    page: 1,
    nev: "",
    kategoria: "",
    kategoriak: [
      "vígjáték",
      "dráma",
      "életrajz",
      "akció",
      "romantikus",
      "dokumentumfilm",
      "kaland",
      "animáció",
      "thriller",
      "családi",
      "bűnügyi",
      "rövidfilm",
      "musical",
      "sci-fi",
      "misztikus",
      "háborús",
      "western",
      "horror",
      "történelmi",
      "sport",
      "zene",
      "ismeretterjesztő",
      "valóságshow",
      "3D",
      "fantasy",
    ],
    loading: false,
  };
  setFilms = async (e) => {
    await this.setState({ loading: true });
    await Axios.post(
      `/api/torrent`,
      stringify({
        oldal: this.state.page,
        nev: this.state.nev,
        kategoria: this.state.kategoria,
      })
    )
      .then((e) => {
        if (e.msg !== "NoneFound") {
          this.setState({ filmek: e });
        } else {
          this.setState({ errors: { filmek: "Nincs film" } });
        }
      })
      .catch(console.log);
    await this.setState({ loading: false });
    if (e !== undefined) {
      e.preventDefault();
    }
  };
  kategoriaChange = (e) => {
    const kategoriak = [...this.state.kategoria];
    if (kategoriak.includes(e.target.name)) {
      let ujarr = kategoriak.filter((x) => x !== e.target.name);
      console.log(ujarr);
      this.setState({ kategoria: ujarr });
    } else {
      kategoriak.push(e.target.name);
      this.setState({ kategoria: kategoriak });
    }
  };
  searchChange = (e) => {
    this.setState({ nev: e.target.value });
  };
  nextPage = () => {
    this.setState({ loading: true });
    const page = this.state.page + 1;
    this.setState({ page });

    this.setFilms();
  };
  prevPage = () => {
    this.setState({ loading: true });
    const page = this.state.page - 1;
    this.setState({ page });

    this.setFilms();
  };
  componentDidMount() {
    this.setFilms();
  }
  render() {
    return (
      <div className="container text-center">
        <div className="row">
          <form onSubmit={this.setFilms}>
            <label htmlFor="fname">Film címe:</label>
            <input
              type="text"
              id="fname"
              name="fname"
              onChange={this.searchChange}
              style={{ margin: "40px" }}
            />
            <button type="submit" className="btn btn-primary">
              Keresés
            </button>
            <div className="row row-cols-6">
              {this.state.kategoriak.map((element, index) => (
                <div className="" key={index}>
                  <div className="col">
                    <label
                      htmlFor={element}
                      className="form-check-label"
                      style={{ paddingRight: "10px" }}
                    >
                      {element}
                    </label>
                    <input
                      type="checkbox"
                      name={element}
                      onClick={this.kategoriaChange}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h5>Keresés a következő paraméterekkel: </h5>
              <h6>Film címe: {this.state.nev}</h6>
              <h6>Kategóriákban: {this.state.kategoria}</h6>
            </div>
          </form>
        </div>
        <LoadFilms
          films={this.state.filmek.data}
          loading={this.state.loading}
        />
        <br />
        <div>
          <nav className="justify-content-center">
            <ul className="pagination ">
              {this.state.page !== 1 ? (
                <li className="page-item" onClick={this.prevPage}>
                  <button className="page-link">Előző oldal</button>
                </li>
              ) : (
                <li className="page-item disabled" onClick={this.prevPage}>
                  <button className="page-link">Előző oldal</button>
                </li>
              )}
              <li className="page-item disabled">
                <div className="page-link ">{this.state.page}</div>
              </li>
              {
                <li className="page-item" onClick={this.nextPage}>
                  <button className="page-link">Következő oldal</button>
                </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  films: state.films.params,
});
export default connect(mapStateToProps, { fetchFilms })(Landing);
