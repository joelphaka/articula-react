import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isSidebarOpen: false,
    appName: "Articula",
}

const uiSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        sidebarToggled: (state, action) => {
            state.isSidebarOpen = !action.payload
        },
        appNameChanged: (state, action) => {
            state.appName = action.payload
        },
        reset: (state, action) => {

        }
    }
})


// Extract the action creators object and the reducer
const { actions, reducer } = uiSlice
// Extract and export each action creator by name
export const {sidebarToggled, appNameChanged} = actions
// Export the reducer, either as a default or named export
export default reducer
