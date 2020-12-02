import {combineReducers} from 'redux';
import authReducer from './authReducer';
import avatarReducer from "./avatarReducer"
import uiReducer from './uiReducer';
import articleReducer from './articleReducer'
import profileReducer from './profileReducer'
import {logout} from "./common";

const combineReducer = combineReducers({
    auth: authReducer,
    avatar: avatarReducer,
    article: articleReducer,
    profile: profileReducer,
    ui: uiReducer,
})

const rootReducer = (state, action) => {
    if (action.type === logout.type) {
        state = undefined
    }

    return combineReducer(state, action);
}

export default rootReducer;