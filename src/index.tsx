import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";
import AppContainer from "./container/AppContainer";
import Store from "./store/Store";
import { Provider } from "react-redux";

ReactDOM.render(
    <React.StrictMode>
        <Router basename="/">
            <Provider store={Store}>
                <AppContainer />
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
