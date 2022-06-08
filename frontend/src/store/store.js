import { configureStore } from "@reduxjs/toolkit";
import contractorReducer from './reducers/contractor'

export default configureStore({
    reducer: {
        contractor: contractorReducer,
    }
})