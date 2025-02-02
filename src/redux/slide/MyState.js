import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const MyState = createSlice({
  name: "MyState",
  initialState: {
    isClicked: false,
    flipped: false,
    isLogged: false,
  },
  reducers: {
    setIsClicked: (state, action) => {
      state.isClicked = action.payload;
    },
    setFlipped: (state, action) => {
      state.flipped = action.payload;
    },
    setIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
  },
});
export const { setIsClicked, setFlipped, setIsLogged } = MyState.actions;
export default MyState.reducer;
