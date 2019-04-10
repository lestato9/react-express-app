import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { toast } from 'react-toastify';

import App from 'components/App';
import { reducer } from "redux/reducer";

import "semantic-ui-css/semantic.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "normalize.css";
import "index.css";

// configure notifications lib
toast.configure({
  autoClose: 2500
});

// configure store
export const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
