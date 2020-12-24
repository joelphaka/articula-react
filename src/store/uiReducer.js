import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isSidebarOpen: false,
    appName: "Articula",
    errorDialog: {
        title: 'Error',
        children: 'An error occurred. Please try again later.',
        isOpen: false,
    }
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        sidebarToggled: (state, action) => {
            state.isSidebarOpen = !action.payload
        },
        appNameChanged: (state, action) => {
            state.appName = action.payload
        },
        showErrorDialog: (state, {payload}) => {
            state.errorDialog = {
                ...payload,
                children: payload ? (payload.content ?? payload.children) : state.errorDialog.children,
                isOpen: true,
            }
        },
        closeErrorDialog: state => {
            state.errorDialog.isOpen = false;
        }
    }
})


// Extract the action creators object and the reducer
const { actions, reducer } = uiSlice
// Extract and export each action creator by name
export const {showErrorDialog, closeErrorDialog} = actions
// Export the reducer, either as a default or named export
export default reducer
