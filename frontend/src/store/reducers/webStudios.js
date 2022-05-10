import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axio from 'axios';


export const fetchWebStudios = createAsyncThunk(
    'webStudios/fetchList', async ({query_str, page}, {rejectedWithValue}) => {

        let url = query_str ? `/api/web-studios/?page=${page}&${query_str}` : `/api/web-studios/?page=${page}`

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


export const webStudiosSlice = createSlice({
    name: 'webStudio',
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