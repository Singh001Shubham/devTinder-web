import { createSlice } from '@reduxjs/toolkit';

const feedReducer = createSlice({
    name : 'feed',
    initialState : null,
    reducers : {
        addFeed : (state,action) => action.payload,
        removeFeed : (state,action) => {
            const newArr = state.filter((res)=>res._id != action.payload)
            return newArr;
        }
    }
})
export const { addFeed, removeFeed } = feedReducer.actions;
export default feedReducer.reducer;
