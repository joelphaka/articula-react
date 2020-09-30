import React from 'react';
import LoginForm from "../../../components/auth/LoginForm";
import MasterLayout from "../../../components/layouts/MasterLayout";

function LoginPage() {
    return (
        <MasterLayout>
            <div className="container py-5">
                <div className="row">
                    <div className='col-md-8 col-sm-10 m-md-auto m-sm-auto'>
                        <LoginForm/>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}

export default LoginPage;