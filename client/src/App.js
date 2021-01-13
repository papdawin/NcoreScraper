import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./Landing.js";
import Films from "./Components/Films.js";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" component={Landing} />
          <Route exact path="/films" component={Films} />
        </BrowserRouter>
      </div>
    );
  }
}
