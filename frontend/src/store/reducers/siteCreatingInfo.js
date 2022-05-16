import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


const componentsToShow = {
    1: 'alo',
    2: 'blabla',
    3: 'xaxaxa'
}

export const siteCreatingInfoSlice = createSlice({
    name: 'siteCreatingInfo',
    initialState: {
        showedComponentId: 1,
        componentsToShow,
    },
    reducers: {
        editShowedComponent(state, action){
            state.showedComponentId = action.payload
        }
    }
})

export const {editShowedComponent} = siteCreatingInfoSlice.actions
export default siteCreatingInfoSlice.reducer