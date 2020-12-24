import React from 'react';
import { useLocation,  Redirect } from "react-router-dom";
import {useSelector} from "react-redux";
import {buildUrl} from "../lib/utils";
import useQueryParams from "../hooks/useQueryParams";

function RoutedComponent (props) {
    const {route, ...rest} = props;
    const {component: Component, isGuest, requiresAuth} = route;
    const auth = useSelector(state => state.auth);
    const location = useLocation();
    const currentUrl = buildUrl(location)
    const query = useQueryParams();

    if (requiresAuth) {
        if (!auth.isLoggedIn) {
            const returnUrl = !(location.pathname.startsWith('/logout') || location.pathname.startsWith('/login'))
                ? currentUrl
                : null;

            return <Redirect from={location.pathname} to={`/login${returnUrl?`?returnUrl=${returnUrl}`:''}`}/>
        }
    }

    if (isGuest) {
        if (auth.isLoggedIn) {
            if (location.pathname.startsWith('/login') && query.returnUrl) {
                return <Redirect from={location.pathname} to={query.returnUrl}/>
            } else {
                return <Redirect to="/"/>
            }
        }
    }

    return Component ? <Component {...rest}/> : null;
}

export default RoutedComponent;