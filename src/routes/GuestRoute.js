import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";

function GuestRoute(props) {
    const auth = useSelector(state => state.auth);
    const {component, ...rest} = props;

    return (
        <Route
            {...rest}
            render={() => {
                const Component = props.component;

                return auth.isLoggedIn
                    ? <Redirect to="/"/>
                    : <Component {...rest}/>

            }}
        />
    )

}

export default GuestRoute;