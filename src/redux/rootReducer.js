import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../../src/redux/slices/authSlice'
import farm from '../../src/redux/slices/farmSlice'
import pest from '../../src/redux/slices/pesticidesSlice'

const rootReducer = combineReducers({
  authReducer,
  farm,
  pest
});
export default rootReducer;
