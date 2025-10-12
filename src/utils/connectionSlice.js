import { createSlice } from "@reduxjs/toolkit";

const connectionReducer = createSlice({
    name : 'connection',
    initialState : null,
    reducers : {
        addConnections : (state,action)=>action.payload,
        removeConnections : (state,action)=>null
    }
})

export const {addConnections,removeConnections} = connectionReducer.actions;
export default connectionReducer.reducer;