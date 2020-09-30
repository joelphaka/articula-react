import {createAction} from "@reduxjs/toolkit";
import {storageService} from "../services";

export const logout = createAction('LOGOUT');

export function isLoggedIn () {
    return storageService.has('access_token') && storageService.has('user')
}
