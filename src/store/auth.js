import {createSlice} from '@reduxjs/toolkit'
import {storageService} from '../services'
import {logout} from "./common";


const initialState = {
    access_token: storageService.get('access_token'),
    user: storageService.get('user'),
    isLoggedIn: storageService.has('access_token') && storageService.has('user'),
    returnUrl: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, {payload: {access_token, user, returnUrl}}) => {
            state.access_token = access_token;
            state.user = user;
            state.isLoggedIn = true;
            state.returnUrl = returnUrl;
        },
    },
    extraReducers: {
        [logout.type]: (state) => {
            Object.assign(state, {
                ...initialState,
                access_token: null,
                user: null,
                isLoggedIn: false,
            })
        }
    }
})


// Extract the action creators object and the reducer
const { actions, reducer } = authSlice
// Extract each action creator by name
const { login } = actions
// Export the reducer, either as a default or named export
export default reducer

export const loginUser = ({user, access_token}) => {
    return (dispatch) => {
        dispatch(login({user, access_token}));

        storageService.set('access_token', access_token);
        storageService.set('user', user);
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        storageService.remove('access_token');
        storageService.remove('user');

        dispatch(logout())
    }
}