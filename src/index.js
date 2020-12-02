import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/v4-shims.min.css";
import "jquery/dist/jquery.min";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store'
import {Provider} from "react-redux";
import setupHttpClient from "./services/setupHttpClient";
import {
    BrowserRouter as Router,
} from "react-router-dom";

setupHttpClient();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
