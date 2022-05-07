import { configureStore } from "@reduxjs/toolkit";
import webStudioReducer from './reducers/webStudios'

export default configureStore({
    reducer: {
        webStudio: webStudioReducer,
    }
})