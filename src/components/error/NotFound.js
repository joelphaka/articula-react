import React from 'react';
import MasterLayout from "../../components/layouts/MasterLayout";


function NoFound() {
    return (
        <MasterLayout>
            <div className="container py-5">
                <div className="row">
                    <div className='col-md-12'>
                        <h1>
                            Page Not Found
                        </h1>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}

export default NoFound;