import rootReducer from './reducers'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
})

export default store;