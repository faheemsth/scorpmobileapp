
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from '../../utils/axios';



const initialState = {

  farmData: null,
  farmList: [],
  loading: false,
  error: null,
}

export const GetMyFarms = createAsyncThunk('GetMyFarms', async (userData) => {
  try {
    const response = await get(`/get-my-farms`,);
    return response.data;
  } catch (error) {
    console.log("lllllllllllll",error)
    throw error.response?.data || error.message;
  }
});

const farmSlice = createSlice({
  name: "farm",
  initialState,
  reducers: {
    storeFarmData: (state, { payload }) => {
      console.log("payload...", payload)
      state.farmData = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetMyFarms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetMyFarms.fulfilled, (state, { payload }) => {
        
        state.farmList = payload.data.farms;
        state.loading = false;
      })

      .addCase(GetMyFarms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { storeFarmData } = farmSlice.actions;

export default farmSlice.reducer;