
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../../utils/axios';



const initialState = {

  pestImage: null,
  selectedfarm: null,
  selectedCorp: null,
  loading: false,
  error: null,
}

const pestSlice = createSlice({
  name: "pest",
  initialState,
  reducers: {
    setPestImage: (state, { payload }) => {
      state.pestImage = payload
    },
    setSelectedFarm: (state, { payload }) => {
      state.selectedfarm = payload
    },
    setSelectedcorp: (state, { payload }) => {
      state.selectedCorp = payload
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(signUpAsync.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })

  },
});

export const { setPestImage, setSelectedFarm, setSelectedcorp } = pestSlice.actions;

export default pestSlice.reducer;