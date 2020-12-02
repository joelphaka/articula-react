import {createSlice} from '@reduxjs/toolkit'
import storageService from '../services/storage.service'
import {logout} from "./common";
import {authService} from "../services/api";
import {formatError} from "../lib/utils";



const initialState = {
    access_token: storageService.get('access_token'),
    user: storageService.get('user'),
    isLoggedIn: storageService.has('access_token') && storageService.has('user'),
    isLoggingIn: false,
    isLoggingOut: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loggedIn: (state, {payload: {access_token, user}}) => {
            state.access_token = access_token;
            state.user = user;
            state.isLoggedIn = true;
            state.error = null;

            storageService.set('access_token', access_token);
            storageService.set('user', user);
        },
        userUpdated: (state, {payload}) => {
            state.user = {
                ...state.user,
                ...payload,
                avatar: `${payload.avatar}?s=${Date.now()}`
            };
            storageService.set('user', state.user);
        },
        loginBegan: (state) => {
            state.isLoggingIn = true;
        },
        loginEnded: (state) => {
            state.isLoggingIn = false;
        },
        logoutBegan: (state) => {
            state.isLoggingOut = true;
        },
        logoutEnded: (state) => {
            state.isLoggingOut = false;
        },
        errorOccurred: (state, {payload}) => {
            state.error = payload;
        },
    },
    extraReducers: {
        [logout.type]: (state) => {
            Object.assign(state, {
                ...initialState,
                access_token: null,
                user: null,
                isLoggedIn: false,
            });

            storageService.remove('access_token');
            storageService.remove('user');
        }
    }
})


// Extract the action creators object and the reducer
const { actions, reducer } = authSlice
// Extract each action creator by name
const {
    loggedIn,
    loginBegan,
    loginEnded,
    logoutBegan,
    logoutEnded,
    userUpdated,
    errorOccurred,
} = actions
// Export the reducer, either as a default or named export
export default reducer;

export const loginUser = (credentials) =>  async dispatch => {
    try {
        dispatch(loginBegan());
        const {user, access_token} = await authService.login(credentials);
        dispatch(loggedIn({user, access_token}))
    } catch (e) {
        dispatch(errorOccurred(formatError(e)));
    } finally {
        dispatch(loginEnded())
    }
}

export const logoutUser = () => async dispatch => {
    try {
        dispatch(logoutBegan())
        await authService.logout();
    } catch (e) {
        dispatch(errorOccurred(formatError(e)));
    } finally {
        dispatch(logout());
        dispatch(logoutEnded());
        window.location.reload();
    }
}

export const updateAuthUser = (user) => dispatch => {
    dispatch(userUpdated(user));
}