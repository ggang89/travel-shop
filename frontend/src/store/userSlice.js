import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    id: "",
    email: "",
    name: "",
    role: 0,
    image: "",
  },
  isAuth: false,
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default userSlice.reducer;
//reducer를 이용해서 리덕스 스토어를 생성한다
