import { configureStore } from "@reduxjs/toolkit";
import contractorReducer from './reducers/contractor'
import siteCreatingInfoReducer from './reducers/siteCreatingInfo'

export default configureStore({
    reducer: {
        contractor: contractorReducer,
        siteCreatingInfo: siteCreatingInfoReducer,
    }
})