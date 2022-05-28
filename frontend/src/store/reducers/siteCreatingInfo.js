// import {createSlice} from '@reduxjs/toolkit';
// import SiteCreatingStages from "../../App/SiteCreating/SiteCreatingStages/SiteCreatingStages";
// import ConstructorSiteCreating from "../../App/SiteCreating/ConstructorSiteCreating/ConstructorSiteCreating";
// import CMSSiteCreating from "../../App/SiteCreating/CMSSiteCreating/CMSSiteCreating";
//
// const componentsToShow = {
//     1: SiteCreatingStages(),
//     2: ConstructorSiteCreating(),
//     3: CMSSiteCreating()
// }
//
// export const siteCreatingInfoSlice = createSlice({
//     name: 'siteCreatingInfo',
//     initialState: {
//         showedComponentId: 1,
//         componentsToShow,
//     },
//     reducers: {
//         editShowedComponent(state, action){
//             state.showedComponentId = action.payload
//         }
//     }
// })
//
// export const {editShowedComponent} = siteCreatingInfoSlice.actions
// export default siteCreatingInfoSlice.reducer