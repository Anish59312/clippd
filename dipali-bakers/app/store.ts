///////////////////////////////////
//  REDUX STORE WAS CREATED BUT NOT USED

import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice for tableNumber
const tableNumberSlice = createSlice({
  name: 'tableNumber',
  initialState: 0,
  reducers: {
    setTableNumber: (state, action) => action.payload,
  },
});

// Export the action to set tableNumber
export const { setTableNumber } = tableNumberSlice.actions;

// Create the Redux store
const store = configureStore({
  reducer: {
    tableNumber: tableNumberSlice.reducer,
  },
});

// Export the store
export default store;
