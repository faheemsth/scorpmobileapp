
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from '../../utils/axios';
import { storeToken } from '../../utils/StorageToken';

 const BASE_URL = 'https://smartpest.godepth.com/backend/api/v1';
export const IMAGE_BASE_URL = 'https://smartpest.godepth.com/backend/uploads/images';

export const signUpAsync = createAsyncThunk('auth/signUp', async (userData) => {
  try {
    const response = await post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
});

export const signInAsync = createAsyncThunk('auth/signIn', async (userData) => {
  try {
    const response = await post(`${BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
});


export const GetUserProfile = createAsyncThunk('getMyProfile', async (userData) => {
  try {
    const response = await get(`/get-my-profile`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuth: false,
    loading: false,
    error: null,
  },
  reducers: {


    setAuth: (state, action) => {
      if (!action.payload) {
        state.isAuth = false;
        storeToken(null)
      } else {
        state.isAuth = action.payload
      }
    },
    setUser: (state, { payload }) => {
      state.user = payload;

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.fields = {
          email: '',
          name: '',
          password: '',
          confirmPassword: '',
          role: 'User',
          occupation: '',
        };
      })

      .addCase(signInAsync.fulfilled, (state, action) => {
        console.log('Action Payload:', action.payload);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        storeToken(action.payload.token)
      })
      .addCase(GetUserProfile.fulfilled, (state, { payload }) => {
        state.user = payload.data.user;
        state.isAuth = true;
        state.loading = false;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(GetUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(signInAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setAuth,setUser } = authSlice.actions;

export default authSlice.reducer;