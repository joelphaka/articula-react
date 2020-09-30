import util from 'util'

export default {
    MESSAGE_REQUIRED: "This field is required.",
    MESSAGE_USERNAME_EXISTS: 'The username already exists.',
    MESSAGE_USERNAME_IN_USE: 'An account with this username already exists.',
    MESSAGE_EMAIL_EXISTS: 'This email is already in use.',
    MESSAGE_EMAIL_IN_USE: 'An account with this email already exists.',
    MESSAGE_TERMS_AND_CONDITIONS: 'You must agree with the terms and conditions.',
    MESSAGE_EMAIL: "Please enter a valid email address.",
    MESSAGE_URL: "Please enter a valid URL.",
    MESSAGE_DATE: "Please enter a valid date.",
    MESSAGE_NUMBER: "Please enter a valid number.",
    MESSAGE_DIGIT: "Please enter only digits.",
    MESSAGE_EQUAL_TO: "Please enter the same value again.",
    MESSAGE_MATCH_PASSWORD: "Passwords do not match.",
    MESSAGE_EMPTY: 'The field cannot be empty',
    MESSAGE_NAME: 'Please enter a valid name',
    /**
     * @return {string}
     */
    MESSAGE_MAX_LENGTH (arg) {
        return util.format("Please enter no more than %d characters.", arg);
    },
    /**
     * @return {string}
     */
    MESSAGE_MIN_LENGTH (arg) {
        return util.format("Please enter at least %d characters.", arg);
    },
    /**
     * @return {string}
     */
    MESSAGE_RANGE_LENGTH (arg, arg2) {
        return util.format("Please enter a value between %d and %d characters long.", arg, arg2);
    },
    /**
     * @return {string}
     */
    MESSAGE_RANGE (arg, arg2) {
        return util.format("Please enter a value between %d and %d.", arg, arg2);
    },
    /**
     * @return {string}
     */
    MESSAGE_MAX (arg) {
        return util.format("Please enter a value less than or equal to %d.", arg);
    },
    /**
     * @return {string}
     */
    MESSAGE_MIN (arg) {
        return util.format("Please enter a value greater than or equal to %d.", arg);
    },
    /**
     * @return {string}
     */
    MESSAGE_MIN_AGE (arg) {
        return util.format('You must be at least %d year(s) old.', arg)
    }
};