import util from 'util'

export const MESSAGE_REQUIRED = "This field is required.";
export const MESSAGE_USERNAME_EXISTS = 'The username already exists.';
export const MESSAGE_USERNAME_IN_USE = 'An account with this username already exists.';
export const MESSAGE_EMAIL_EXISTS = 'This email is already in use.';
export const MESSAGE_EMAIL_IN_USE = 'An account with this email already exists.';
export const MESSAGE_TERMS_AND_CONDITIONS = 'You must agree with the terms and conditions.';
export const MESSAGE_EMAIL = "Please enter a valid email address.";
export const MESSAGE_URL = "Please enter a valid URL.";
export const MESSAGE_DATE = "Please enter a valid date.";
export const MESSAGE_NUMBER = "Please enter a valid number.";
export const MESSAGE_DIGIT = "Please enter only digits.";
export const MESSAGE_EQUAL_TO = "Please enter the same value again.";
export const MESSAGE_MATCH_PASSWORD = "Passwords do not match.";
export const MESSAGE_EMPTY = 'The field cannot be empty';
export const MESSAGE_NAME = 'Please enter a valid name';

/**
 * @return {string}
 */
export const MESSAGE_MAX_LENGTH = arg => util.format("Please enter no more than %d characters.", arg);

/**
 * @return {string}
 */
export const MESSAGE_MIN_LENGTH = arg => util.format("Please enter at least %d characters.", arg);

/**
 * @return {string}
 */
export const MESSAGE_RANGE_LENGTH = (arg, arg2) => util.format("Please enter a value between %d and %d characters long.", arg, arg2);

/**
 * @return {string}
 */
export const MESSAGE_RANGE = (arg, arg2) => util.format("Please enter a value between %d and %d.", arg, arg2);

/**
 * @return {string}
 */
export const MESSAGE_MAX = arg => util.format("Please enter a value less than or equal to %d.", arg);

/**
 * @return {string}
 */
export const MESSAGE_MIN = arg => util.format("Please enter a value greater than or equal to %d.", arg);

/**
 * @return {string}
 */
export const MESSAGE_MIN_AGE = arg => util.format('You must be at least %d year(s) old.', arg);


export default {
    MESSAGE_REQUIRED,
    MESSAGE_USERNAME_EXISTS,
    MESSAGE_USERNAME_IN_USE,
    MESSAGE_EMAIL_EXISTS,
    MESSAGE_EMAIL_IN_USE,
    MESSAGE_TERMS_AND_CONDITIONS,
    MESSAGE_EMAIL,
    MESSAGE_URL,
    MESSAGE_DATE,
    MESSAGE_NUMBER,
    MESSAGE_DIGIT,
    MESSAGE_EQUAL_TO,
    MESSAGE_MATCH_PASSWORD,
    MESSAGE_EMPTY,
    MESSAGE_NAME,
    MESSAGE_MAX_LENGTH,
    MESSAGE_MIN_LENGTH,
    MESSAGE_RANGE_LENGTH,
    MESSAGE_RANGE,
    MESSAGE_MAX,
    MESSAGE_MIN,
    MESSAGE_MIN_AGE,
};