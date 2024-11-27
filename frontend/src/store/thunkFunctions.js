import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (body,thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/users/register`,//백엔드에서 받는 경로
        body
      )

      return response.data;
      //response.data가 액션의 페이로드

    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
  
)

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/login`, body);

     return response.data;
      //response.data가 액션의 페이로드 =>email, password가 들어가 있음
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const authUser = createAsyncThunk(
  "user/authUser",
  async(_, thunkAPI)=> {
    try {
      const response = await axiosInstance.get(
        '/users/auth'
      )
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message)
      
    }
  }
)

