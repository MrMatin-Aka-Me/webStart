import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axio from 'axios';


export const fetchContractors = createAsyncThunk(
    'contractors/fetchList', async ({query_str, page}, {rejectedWithValue}) => {

        let url = query_str ? `/api/contractor/?page=${page}&${query_str}` : `/api/contractor/?page=${page}`

        try {
            const elements = await axio.get(url, {
                auth:{
                    username: 'admin',
                    password: 'admin'
                }
            });
            return elements.data
        } catch (err) {
            return rejectedWithValue(err.response.data);
        }
    }
);


export const contractorsSlice = createSlice({
    name: 'contractor',
    initialState: {
        contractorList: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchContractors.fulfilled, (state, action) => {
            state.contractorList = action.payload
        });
        builder.addCase(fetchContractors.rejected, (state, {payload}) => {
            state.error = payload
        });
    },
})

export default contractorsSlice.reducer