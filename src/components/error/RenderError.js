import React from 'react';
import MasterLayout from "../../components/layouts/MasterLayout";
import {Redirect} from "react-router-dom";


function RenderError({error}) {
    if (error.status === 404) {
        return <Redirect to={'/not-found'}/>
    }

    return (
        <div className='alert alert-danger'>
            An error occurred
        </div>
    )
}

export default NoFound;