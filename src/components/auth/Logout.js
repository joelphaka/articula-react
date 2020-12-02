import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {logoutUser} from "../../store/authReducer";
import Spinner from "../ui/Spinner";


function Logout() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutUser())
    },[])

    return (
        <div className="container">
            <div className="d-flex justify-content-center position-absolute center-relative mb-auto">
                <Spinner/>
            </div>
        </div>
    );
}

export default Logout;