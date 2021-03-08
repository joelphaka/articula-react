import React from 'react';
import MasterLayout from "../../components/layouts/MasterLayout";

function AboutPage() {
    return (
        <MasterLayout>
            <div className="container py-5">
                <div className="row">
                    <div className='col-md-8 col-sm-10 m-md-auto m-sm-auto'>
                        <h1>About</h1>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}

export default AboutPage;