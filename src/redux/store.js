import { configureStore } from "@reduxjs/toolkit";
import LessonSlide from "./slide/LessonSlide";
import chapterSlide from "./slide/chapterSlide";
import MyState from "./slide/MyState";

export default configureStore({
  reducer: {
    MyState: MyState,
    LessonSlide: LessonSlide,
    chapterSlice: chapterSlide,
  },
});
