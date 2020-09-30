import React, {useState} from 'react';
import { Formik, Form } from 'formik'
import FormControl from "../../components/ui/Form/FormControl";
import * as Yup from 'yup'
import classes from './styles/LoginForm.module.css'
import validationMessages from '../../lib/validation.messages'
import useQueryParams from "../../hooks/useQueryParams";
import {authService} from "../../services/api";
import {formatError, formatValidationErrors} from "../../lib/utils";
import {loginUser} from "../../store/auth";
import Spinner from "../ui/Spinner";
import {useDispatch} from "react-redux";
import {Link, useHistory} from "react-router-dom";

function LoginForm() {
    const initialValues = {
        email: '',
        password: '',
    };
    const {
        MESSAGE_REQUIRED,
        MESSAGE_EMAIL
    } = validationMessages;

    const validationSchema = Yup.object({
        email: Yup
            .string()
            .required(MESSAGE_REQUIRED)
            .email(MESSAGE_EMAIL),
        password: Yup
            .string()
            .required(MESSAGE_REQUIRED),
    });

    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const {returnUrl} = useQueryParams();

    async function handSubmit(values, form) {
        try {
            form.setSubmitting(true)
            const {user, access_token} = await authService.login(values);
            form.setSubmitting(false);
            setError(null);

            dispatch(loginUser({user, access_token}))
            history.replace(returnUrl ?? '/');

        } catch (e) {
            const responseError = formatError(e);
            setError(responseError);

            if (responseError.isValidation) {
                form.setErrors(formatValidationErrors(responseError.errors));
            }

            form.setSubmitting(false);
        }
    }

    function renderError() {
        if (!error) return null;

        return (
            <div className="alert alert-danger text-center mt-3" role="alert">
                {
                    (() => {
                        if (error.status === 400 || error.status === 401) {
                            return 'Incorrect email or password.'
                        } else if (error.status === 500) {
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
                                    disabled={formik.isSubmitting}
                                />
                                <FormControl
                                    name='password'
                                    placeholder='Password'
                                    type='password'
                                    className='form-group'
                                    disabled={formik.isSubmitting}
                                />
                                <div className="text-center" style={{marginTop: '15px', marginBottom: '20px'}}>
                                    <span>Don't have an account?&nbsp;</span>
                                    <Link to="/register">Create one</Link>
                                </div>
                                <button
                                    className="btn btn-primary btn-block"
                                    type="submit" disabled={!formik.isValid || formik.isSubmitting}>
                                    Sign in
                                </button>
                            </section>
                            {
                                formik.isSubmitting &&
                                <Spinner wrapperClass='center-relative position-absolute'/>
                            }
                        </Form>
                    );
                }
            }

        </Formik>
    );
}

export default LoginForm;