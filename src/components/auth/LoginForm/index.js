import React from 'react';
import { Formik, Form } from 'formik'
import FormControl from "../../../components/ui/Form/FormControl";
import * as Yup from 'yup'
import classes from './LoginForm.module.css'
import {
    MESSAGE_REQUIRED,
    MESSAGE_EMAIL
} from '../../../lib/validation.messages'
import {loginUser} from "../../../store/authReducer";
import Spinner from "../../ui/Spinner";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import useCurrentCallback from "../../../hooks/useCurrentCallback";
import {StatusCodes} from "http-status-codes";


const initialValues = {
    email: '',
    password: '',
};

const validationSchema = Yup.object({
    email: Yup
        .string()
        .required(MESSAGE_REQUIRED)
        .email(MESSAGE_EMAIL),
    password: Yup
        .string()
        .required(MESSAGE_REQUIRED),
});

function LoginForm() {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handSubmit = useCurrentCallback((isCurrent) =>
        async (values) => {
            if (!auth.isLoggingIn) await dispatch(loginUser(values));
        })

    function renderError() {
        if (!auth.error) return null;

        return (
            <div className="alert alert-danger text-center mt-3" role="alert">
                {
                    (() => {
                        if (auth.error.status === StatusCodes.BAD_REQUEST || auth.error.status === StatusCodes.UNAUTHORIZED) {
                            return 'Incorrect email or password.'
                        } else if (auth.error.status === 500) {
                            return 'An error occurred. Please try again later.'
                        }
                    })()
                }
            </div>
        );
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handSubmit}>
            {
                (formik) => {
                    return (
                        <Form className={classes.loginForm}>
                            <section style={{marginBottom: '30px'}}>
                                <h2 className='main-header text-center'> Sign in</h2>
                                <div className='text-center'> Sign in with your credentials</div>
                                {renderError()}
                            </section>
                            <section>
                                <FormControl
                                    name='email'
                                    placeholder='Email'
                                    type='email'
                                    className='form-group'
                                    disabled={auth.isLoggingIn}
                                />
                                <FormControl
                                    name='password'
                                    placeholder='Password'
                                    type='password'
                                    className='form-group'
                                    disabled={auth.isLoggingIn}
                                />
                                {
                                    !auth.isLoggingIn &&
                                    <div className="text-center" style={{marginTop: '15px', marginBottom: '20px'}}>
                                        <span>Don't have an account?&nbsp;</span>
                                        <Link to="/register">Create one</Link>
                                    </div>
                                }
                                <button
                                    className="btn btn-primary btn-block"
                                    type="submit" disabled={!formik.isValid || auth.isLoggingIn}>
                                    Sign in
                                </button>
                            </section>
                            {
                                auth.isLoggingIn &&
                                <Spinner className='center-relative position-absolute'/>
                            }
                        </Form>
                    );
                }
            }

        </Formik>
    );
}

export default LoginForm;