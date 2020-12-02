import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isSidebarOpen: false,
    appName: "Articula",
    articleFilters: [
        {value: 'created_at_desc', label: 'Latest', meta: {sort_by: 'created_at', sort_direction: 'desc'}},
        {value: 'created_at_asc', label: 'Oldest', meta: {sort_by: 'created_at', sort_direction: 'asc'}},
        {value: 'likes_count', label: 'Most liked', meta: {sort_by: 'likes_count', sort_direction: 'desc'}},
        {value: 'views', label: 'Most viewed', meta: {sort_by: 'views', sort_direction: 'desc'}},
    ]
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
