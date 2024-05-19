import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    mode :"dark",
    dataId : "66492e88f1e815ec6776e6d0"
    
};

export const globalSlice = createSlice({
    name :"global",
    initialState,
    reducers : {
        setMode : (state) => {
            state.mode = state.mode === 'light'? 'dark' : 'light'

        }
    }
})


export const {setMode}= globalSlice.actions;

export default globalSlice.reducer;