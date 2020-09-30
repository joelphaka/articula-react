import httpService from '../http.service'

import {
    API_AUTH_LOGIN,
    API_AUTH_REGISTER,
    API_AUTH_LOGOUT,
    API_AUTH_USER,
} from './paths'

export function login(credentials) {
    return httpService.post(API_AUTH_LOGIN, credentials).then(({data}) => data);
}

export function register(data) {
    return httpService.post(API_AUTH_REGISTER, data).then(({data}) => data)
}

export function logout() {
    return httpService.post(API_AUTH_LOGOUT);
}

export function fetchAuthUser() {
    return httpService.get(API_AUTH_USER).then(({data: user}) => user);
}

export default {
    login,
    register,
    logout,
    fetchAuthUser,
}