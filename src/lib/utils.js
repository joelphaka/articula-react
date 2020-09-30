import {isObject} from  'lodash'

export const formatError = (e, log = true) => {

    const error = e.response
        ? {
            status: parseInt(e.response.status),
            isValidation: parseInt(e.response.status) === 422,
            ...e.response.data,
        }
        : {
            status: 500,
            message: e.message,
            isValidation: false
        };

    if (log) console.log(error);

    return error;
}

export const formatValidationErrors = (errors) => {
    errors = isObject(errors) ? errors : {};
    let validationErrors = {};

    Object.keys(errors)
        .forEach(key => {
            validationErrors[key] = errors[key][0];
        });

    return validationErrors;
}