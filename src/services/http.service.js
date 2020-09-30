import axios from 'axios'
import storageService from "./storage.service";
import {formatError} from "../lib/utils";
import store from "../store";
import {logout} from "../store/common";
import {StatusCodes} from "http-status-codes";

axios.interceptors.request.use((config) => {
    config.headers['Accept'] = 'application/json';
    const isLoggedIn =
        storageService.has('access_token') &&
        storageService.has('user')

    if (isLoggedIn) {
        config.headers.common['Authorization'] = `Bearer ${storageService.get('access_token')}`;
    }

    return config;
});

axios.interceptors.response.use(
    (response) => response,
    (error => {
        if (formatError(error).status === StatusCodes.UNAUTHORIZED) {
            store.dispatch(logout())
        }

        return Promise.reject(error);
    })
);

export default axios;
