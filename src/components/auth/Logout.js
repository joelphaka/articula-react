import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom'
import {authService} from "../../services/api";
import {logoutUser} from "../../store/auth";
import Spinner from "../ui/Spinner";
import {formatError} from "../../lib/utils";


function Logout() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        destroySession();
    },[])

    async function destroySession() {
        try {
            setLoggingOut(true);
            await authService.logout();
            setLoggingOut(false);
        } catch (e) {
            formatError(e);
        } finally {
            dispatch(logoutUser());
            history.replace('/login')
        }
    }

    return (
        isLoggingOut &&
        <div className="container">
            <div className="d-flex justify-content-center position-absolute center-relative mb-auto">
                <Spinner/>
            </div>
        </div>
    );
}

export default Logout;