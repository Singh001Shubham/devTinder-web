import { createSlice } from "@reduxjs/toolkit";

const requestReducer = createSlice({
    name : 'request',
    initialState : null,
    reducers : {
        addRequest : (state,action) => action.payload,
        removeRequest : (state,action) => {
            const newArr = state.filter((res)=>res._id!=action.payload)
            return newArr;
        }
    }
})

export const {addRequest,removeRequest} = requestReducer.actions;
export default requestReducer.reducer;