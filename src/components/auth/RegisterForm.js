import React, {useEffect, useRef, useState} from 'react';
import {Formik, Form, Field} from 'formik'
import FormControl from "../../components/ui/Form/FormControl";
import * as Yup from 'yup'
import validationMessages from '../../lib/validation.messages'
import ValidationMessage from "../ui/Form/ValidationMessage";
import {formatError, formatValidationErrors} from "../../lib/utils";
import {useHistory} from "react-router-dom";
import {authService} from "../../services/api";
import Spinner from "../ui/Spinner";
import {useCurrentCallback} from "use-current-effect";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../store/authReducer";

const {
    MESSAGE_REQUIRED,
    MESSAGE_MATCH_PASSWORD,
    MESSAGE_EMAIL,
    MESSAGE_TERMS_AND_CONDITIONS
} = validationMessages;

const validationSchema = Yup.object({
    first_name: Yup
        .string()
        .required(MESSAGE_REQUIRED),
    last_name: Yup
        .string()
        .required(MESSAGE_REQUIRED),
    email: Yup
        .string()
        .required(MESSAGE_REQUIRED)
        .email(MESSAGE_EMAIL),
    password: Yup
        .string()
        .required(MESSAGE_REQUIRED),
    password_confirmation: Yup
        .string()
        .oneOf([Yup.ref('password'), null], MESSAGE_MATCH_PASSWORD),
    accept_terms: Yup
        .boolean()
        .oneOf([true], MESSAGE_TERMS_AND_CONDITIONS)
});

const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    accept_terms: false
};

function RegisterForm({className = ''}) {
    const [error, setError] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const didUpdateRef = useRef(false);

    useEffect(() => {
        if (didUpdateRef.current) {
            if (auth.error) history.replace('/login')
        } else didUpdateRef.current = true;
    }, [auth.error])


    const handleSubmit = useCurrentCallback((isCurrent => async (values, form) => {
        try {
            await authService.register(values);
            const {email, password} = values;
            dispatch(loginUser({email, password}));

        } catch (e) {
            const responseError = formatError(e);

            if (isCurrent()) {
                setError(responseError);

                if (responseError.isValidation) {
                    form.setErrors(responseError.errors);
                }
            }
        }
    }))

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {
                (formik) => {
                    return (
                        <Form className={`position-relative${className ? ` ${className}` : ''}`}>
                            {
                                error && !error.isValidation &&
                                <div className="alert alert-danger text-center mb-3" role="alert">
                                    An error occurred. Please try again later.
                                </div>
                            }
                            <div className="row">
                                <FormControl
                                    name='first_name'
                                    label='First Name'
                                    placeholder='First Name'
                                    className='form-group col-md-6 col-sm-6'
                                    disabled={formik.isSubmitting || auth.isLoggingIn}
                                />
                                <FormControl
                                    name='last_name'
                                    label='Last Name'
                                    placeholder='Last Name'
                                    className='form-group col-md-6 col-sm-6'
                                    disabled={formik.isSubmitting || auth.isLoggingIn}
                                />
                            </div>
                            <div className="row">
                                <FormControl
                                    name='email'
                                    label='Email'
                                    placeholder='Email'
                                    type='email'
                                    className='form-group col-md-12 col-sm-12'
                                    disabled={formik.isSubmitting || auth.isLoggingIn}
                                />
                            </div>
                            <div className="row">
                                <FormControl
                                    name='password'
                                    label='Password'
                                    placeholder='Password'
                                    type='password'
                                    className='form-group col-md-12 col-sm-12'
                                    disabled={formik.isSubmitting || auth.isLoggingIn}
                                />
                            </div>
                            <div className="row">
                                <FormControl
                                    name='password_confirmation'
                                    label='Confirm Password'
                                    placeholder='Confirm Password'
                                    type='password'
                                    className='form-group col-md-12 col-sm-12'
                                    disabled={formik.isSubmitting || auth.isLoggingIn}
                                />
                            </div>
                            <div className="row my-3">
                                <div className="form-group col-md-12 col-sm-12">
                                    <div className="form-check" style={{margin: 0}}>
                                        <label htmlFor="accept_terms" className="form-check-label">
                                            <Field
                                                id='accept_terms'
                                                name="accept_terms"
                                                type='checkbox'
                                                className="form-check-input"
                                                disabled={formik.isSubmitting || auth.isLoggingIn}
                                            />
                                            <span style={{fontWeight: 'normal'}}>
                                    By accepting the terms and condition you agree with Articula.
                                </span>
                                        </label>
                                    </div>
                                    <ValidationMessage name='accept_terms'/>
                                </div>
                            </div>
                            <button
                                type='submit'
                                className='btn btn-primary btn-block'
                                disabled={!formik.isValid || formik.isSubmitting || auth.isLoggingIn}>
                                Register
                            </button>
                            {
                                (formik.isSubmitting  || auth.isLoggingIn) &&
                                <Spinner className='center-relative position-absolute'/>
                            }
                        </Form>
                    )
                }
            }
        </Formik>
    );
}

export default RegisterForm;