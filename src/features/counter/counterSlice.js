import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  api: []

};

export const getAll = createAsyncThunk(
  'counter/getAll',
  async () => {
    const response = await axios.get("http://localhost:3001/all");
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.api = action.payload.data;
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const apiCoinMarket = (state) => state.counter.api;

export default counterSlice.reducer;
