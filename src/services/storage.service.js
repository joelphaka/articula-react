import {isObject, isEmpty} from 'lodash'


export default {
    set (key, value) {
        if (isObject(value) || Array.isArray(value)) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
    },
    get(key) {
        if (this.has(key)) {
            try {
                return JSON.parse(localStorage.getItem(key))
            } catch (e) {
                return localStorage.getItem(key);
            }
        }

        return null;
    },
    has: (key) => !isEmpty(localStorage.getItem(key)),
    remove: (key) => localStorage.removeItem(key),
    clear: () => localStorage.clear()
}