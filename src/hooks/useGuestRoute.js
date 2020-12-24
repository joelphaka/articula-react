import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useLocation, useHistory} from "react-router-dom"
import {buildUrl} from "../lib/utils";

function useGuestRoute() {
    const auth = useSelector(state => state.auth);
    const location = useLocation();
    const history = useHistory();
    const returnUrl = !(location.pathname.startsWith('/logout') || location.pathname.startsWith('/login')) ? buildUrl(location) : null;


    useEffect(() => {
        if (auth.isLoggedIn) {
            history.push(`/`)
        }
    }, [auth])

    return auth;
}

export default useGuestRoute;