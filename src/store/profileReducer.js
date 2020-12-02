import {createSlice} from '@reduxjs/toolkit'
import {formatError} from "../lib/utils";
import {profileService} from "../services/api";
import {updateAuthUser} from "./authReducer";
import {emptyUserArticles} from "./articleReducer";

const initialState = {
    user: null,
    isFetchingProfile: false,
    lastFetchTime: null,
    userError: null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        profileFetchBegan: (state, action) => {
            state.isFetchingProfile = true;
        },
        profileFetchEnded: (state, action) => {
            state.isFetchingProfile = false;
        },
        profileFetchFailed: (state, {payload}) => {
            console.log(payload)
            state.userError = payload;
        },
        profileFetched: (state, {payload}) => {
            state.user = payload;
            state.lastFetchTime = Date.now();
        },
        unloaded: (state, action) => {
            Object.assign(state, initialState);
        },
        errorsCleared: (state) => {
            state.userError = null;
        }
    }
})


// Extract the action creators object and the reducer
const { actions, reducer } = profileSlice
// Extract and export each action creator by name
export const {
    profileFetchBegan,
    profileFetchEnded,
    profileFetched,
    profileFetchFailed,
    unloaded,
    errorsCleared
} = actions
// Export the reducer, either as a default or named export
export default reducer

export const loadUserProfile = (username) => async dispatch => {
    try {
        dispatch(profileFetchBegan());
        const user = await profileService.fetchProfile(username);
        dispatch(profileFetched(user));

        if (user.is_auth_user) dispatch(updateAuthUser(user));

        dispatch(errorsCleared());
    } catch (e) {
        dispatch(profileFetchFailed(formatError(e)));
    } finally {
        dispatch(profileFetchEnded());
    }
}

export const unloadUserProfile = () => dispatch => {
    dispatch(unloaded());
    dispatch(emptyUserArticles());
}

