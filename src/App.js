import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import routes from "./routes";
import './App.css';
import GuestRoute from "./routes/GuestRoute";
import AuthRoute from "./routes/AuthRoute";

function App() {
    return (
        <Router>
            <Switch>
                {routes.map((route, index) => {
                    if (route.requiresAuth) {
                        return <AuthRoute key={index} {...route} exact/>
                    } else {
                        if (route.isGuest) {
                            return <GuestRoute key={index} {...route} exact/>
                        } else {
                            return <Route key={index} {...route} exact/>
                        }
                    }
                })}
            </Switch>
        </Router>
    );
}

export default App;
