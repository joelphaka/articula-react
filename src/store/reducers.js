import {combineReducers} from 'redux'
import authReducer from './auth'
import uiReducer from './ui'
import {logout} from "./common";

const combineReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
})

const rootReducer = (state, action) => {
    if (action.type === logout.type) {
        state = undefined
    }

    return combineReducer(state, action);
}

export default rootReducer;