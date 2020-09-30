import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";

function AuthRoute(props) {
    const auth = useSelector(state => state.auth);
    const {component, ...rest} = props;

    return (
        <Route
            {...rest}
            render={() => {
                const Component = props.component;
                const returnUrl = !(props.path.startsWith('/logout') || props.path.startsWith('/login')) ? props.path : null;

                return auth.isLoggedIn
                    ? <Component {...rest}/>
                    : <Redirect to={`/login${returnUrl ? `?returnUrl=${returnUrl}` : ''}`}/>

            }}
        />
    )


}

export default AuthRoute;