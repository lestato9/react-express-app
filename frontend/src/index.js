import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import App from 'components/App';
import { reducer } from "redux/reducer";

import "normalize.css";

export const store = createStore(
  reducer,
  {},
  composeWithDevTools()
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
