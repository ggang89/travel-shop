import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/users/register`, //백엔드에서 받는 경로
        body
      );

      return response.data;
      //response.data가 액션의 페이로드
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

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
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/users/auth");
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/users/logout");
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  'user/addToCart',
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/users/cart",
        body // {productId:product._id}
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message)
    }
  }
)


export const getCartItems = createAsyncThunk(
  "user/getCartItems",
  async ({cartItemIds, userCart}, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/products/${cartItemIds}?type=array`);
      
      userCart.forEach(cartItem => {
        response.data.forEach((productDetail, index) => {
          if (cartItem.id === productDetail._id) {
            response.data[index].quantity = cartItem.quantity;
          }
        })
      })
      
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);


export const removeCartItem = createAsyncThunk(
  "user/removeCartItem",
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `/users/cart?productId=${productId}`
      );

      response.data.cart.forEach((cartItem) => {
        response.data.productInfo.forEach((productDetail, index) => {
          if (cartItem.id === productDetail._id) {
            response.data.productInfo[index].quantity = cartItem.quantity;
          }
        });
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);