import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axio from 'axios';


export const fetchWebStudios = createAsyncThunk(
    'webStudios/fetchList', async ({query_str, page}, {rejectedWithValue}) => {

        let url = query_str ? `/api/frontend/web-studio/?page=${page}&${query_str}` : `/api/frontend/web-studio/?page=${page}`

        try {
            const elements = await axio.get(url, {
                headers: {withCredentials: true}
            });
            return elements.data
        } catch (err) {
            return rejectedWithValue(err.response.data);
        }
    }
);


export const webStudiosSlice = createSlice({
    name: 'webStudio',
    //начальное состояние параметров -
    initialState: {
        webStudioList: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWebStudios.fulfilled, (state, action) => {
            state.webStudioList = action.payload
        });
        builder.addCase(fetchWebStudios.rejected, (state, {payload}) => {
            state.error = payload
        });
    },
})

export default webStudiosSlice.reducer