import {createSlice} from '@reduxjs/toolkit';
import {updateAuthUser} from "./authReducer";
import {avatarService} from "../services/api";
import {formatError} from "../lib/utils";

const initialState = {
    isUploading: false,
    uploadProgress: 0,
    error: null,
    lastUpdateTime: null,
    isRemoving: false,
    isRemoved: false
}

const avatarSlice = createSlice({
    name: 'avatar',
    initialState: initialState,
    reducers: {
        uploadBegan: state => {
            state.isUploading = true;
        },
        uploading: (state, {payload}) => {
            state.uploadProgress = payload;
        },
        uploaded: (state) => {
            state.lastUpdateTime = Date.now();
        },
        uploadEnded: state => {
            state.isUploading = false;
            state.uploadProgress = 0;
        },
        uploadFailed: (state, {payload}) => {
            state.error = payload;
        },
        removeBegan: state => {
            state.isRemoving = true;
        },
        removed: (state, {payload}) => {
            state.isRemoved = payload;
            state.lastUpdateTime = Date.now();
        },
        removedEnded: state => {
            state.isRemoving = false;
        },
        removedFailed: (state, {payload}) => {
            state.error = payload;
        },
        errorsCleared: state => {
            state.error = null;
        },
    }
})


// Extract the action creators object and the reducer
const { actions, reducer } = avatarSlice
// Extract and export each action creator by name
const {
    uploadBegan,
    uploading,
    uploaded,
    uploadEnded,
    uploadFailed,
    removeBegan,
    removed,
    removedEnded,
    removedFailed,
    errorsCleared
} = actions
// Export the reducer, either as a default or named export
export default reducer

export const uploadAvatar = (file) => async dispatch => {
    try {
        dispatch(uploadBegan());

        const {user} = await avatarService.uploadAvatar(file, p => {
            const percentage = Math.round((p.loaded * 100) / p.total);
            dispatch(uploading(percentage))
        });

        dispatch(updateAuthUser(user));
        dispatch(uploaded());
        dispatch(errorsCleared());
        console.log(user)
    } catch (e) {
        let error = formatError(e, false, false);
        if (error.isValidation) error.errors = error.errors.avatar;

        dispatch(uploadFailed(error))
    } finally {
        dispatch(uploadEnded())
    }
}

export const removeAvatar = () => async dispatch => {
    try {
        dispatch(removeBegan());

        const {user, is_removed} = await avatarService.removeAvatar();

        dispatch(removed(is_removed));
        dispatch(updateAuthUser(user));
        dispatch(errorsCleared());
    } catch (e) {
        dispatch(removedFailed(formatError(e)))
    } finally {
        dispatch(removedEnded())
    }
}