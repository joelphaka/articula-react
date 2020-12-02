import {isObject} from  'lodash'

export function formatError (e, formatValidation = true, log = true) {

    const error = e.response
        ? {
            status: parseInt(e.response.status),
            isValidation: parseInt(e.response.status) === 422,
            ...e.response.data
        }
        : {
            status: 500,
            message: e.message,
            isValidation: false
        };

    if (error.isValidation && error.errors && formatValidation) {
        error.errors = formatValidationErrors(error.errors)
    }

    if (log) console.log(error);

    return error;
}

export function formatValidationErrors (errors) {
    errors = isObject(errors) ? errors : {};
    let validationErrors = {};

    Object.keys(errors)
        .forEach(key => {
            validationErrors[key] = errors[key][0];
        });

    return validationErrors;
}

export const buildUrl = (location) => {
    let _location = { ...(isObject(location) ? location : {})  }

    _location.pathname = _location.pathname ? _location.pathname : '';
    _location.search = _location.pathname ? _location.search : '';

    return `${_location.pathname}${_location.search}`
}