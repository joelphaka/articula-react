import React from 'react';
import {useDispatch} from "react-redux";
import {logoutUser} from "../../store/authReducer";
import Spinner from "../ui/Spinner";
import useCurrentEffect from "../../hooks/useCurrentEffect";


function Logout() {
    const dispatch = useDispatch();

    useCurrentEffect(() => dispatch(logoutUser()), [])

    return (
        <div className="container">
            <div className="d-flex justify-content-center position-absolute center-relative mb-auto">
                <Spinner/>
            </div>
        </div>
    );
}

export default Logout;