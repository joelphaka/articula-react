import React from 'react';
import RegisterForm from "../../components/auth/RegisterForm";
import withMasterLayout from "../../components/layouts/withMasterLayout";

function RegisterPage() {
    return (
        <div className="container py-5">
            <div className="row" style={{marginBottom: '30px'}}>
                <div className="col-md-8 col-sm-10 m-md-auto m-sm-auto text-center">
                    <h1 style={{marginTop: '10px'}}>Create an account</h1>
                    <h5 className="text-muted">Fill in the form to complete your registration</h5>
                </div>
            </div>
            <div className="row">
                <div className='col-md-8 col-sm-10 m-md-auto m-sm-auto'>
                    <RegisterForm/>
                </div>
            </div>
        </div>
    );
}

export default withMasterLayout(RegisterPage);