import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useLocation, useHistory} from "react-router-dom"
import {buildUrl} from "../lib/utils";
import routes from "../routes";
import {Redirect} from "react-router-dom";

function useAuthRoute(component) {
    const auth = useSelector(state => state.auth);
    const location = useLocation();
    const history = useHistory();
    const returnUrl = !(location.pathname.startsWith('/logout') || location.pathname.startsWith('/login')) ? buildUrl(location) : null;

/*
    useEffect(() => {
        if (!auth.isLoggedIn) {
            history.push(`/login${returnUrl ? `?returnUrl=${returnUrl}` : ''}`)
        }
    }, [auth])

    return auth;*/

    if (auth.isLoggedIn) return component;
    else return <Redirect from={location.pathname} to={`/login${returnUrl ? `?returnUrl=${returnUrl}` : ''}`}/>


}

export default useAuthRoute;