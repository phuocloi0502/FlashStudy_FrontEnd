import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const LessonSlide = createSlice({
  name: "LessonSlide",
  initialState: {
    lesson_id_current: "",
  },
  reducers: {
    changeLessonIdCurrent: (state, action) => {
      state.lesson_id_current = action.payload;
    },
  },
});
export const { changeLessonIdCurrent } = LessonSlide.actions;
export default LessonSlide.reducer;
