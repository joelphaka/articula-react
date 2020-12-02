import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import routes from "./routes";
import './App.css';
import RoutedComponent from "./routes/RoutedComponent";

function App() {
    return (
        <Switch>
            {routes.map((route) => (
                    <Route key={route.path} path={route.path} isGreat={true} exact>
                        {(routeProps) => (<RoutedComponent route={route} {...routeProps}/>)}
                    </Route>
                )
            )}
        </Switch>
    );
}

export default App;
