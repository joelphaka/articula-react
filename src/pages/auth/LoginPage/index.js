import React from 'react';
import LoginForm from "../../../components/auth/LoginForm";
import withMasterLayout from "../../../components/layouts/withMasterLayout";

function LoginPage() {
    return (
        <div className="container py-5">
            <div className="row">
                <div className='col-md-8 col-sm-10 m-md-auto m-sm-auto'>
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
}

export default withMasterLayout(LoginPage);