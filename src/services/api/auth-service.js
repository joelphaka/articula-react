import axios from 'axios'

import {
    API_AUTH_LOGIN,
    API_AUTH_REGISTER,
    API_AUTH_LOGOUT,
    API_AUTH_USER,
} from './paths'

export function login(credentials) {
    return axios.post(API_AUTH_LOGIN, credentials).then(({data}) => data);
}

export function register(details) {
    return axios.post(API_AUTH_REGISTER, details).then(({data}) => data)
}

export function logout() {
    return axios.post(API_AUTH_LOGOUT);
}

export function fetchAuthUser() {
    return axios.get(API_AUTH_USER).then(({data: user}) => user);
}

export default {
    login,
    register,
    logout,
    fetchAuthUser,
}