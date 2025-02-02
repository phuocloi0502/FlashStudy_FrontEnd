// chapterSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Action để fetch dữ liệu từ file JSON
export const fetchChapterList = createAsyncThunk(
  "chapter/fetchChapterList",
  async (level) => {
    try {
      const response = await fetch(
        `https://phuocloi0502.github.io/FlashStudy_FrontEnd/data/data${level}.json`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data; // Trả về dữ liệu khi thành công
    } catch (error) {
      throw error; // Nếu có lỗi xảy ra, throw lỗi
    }
  }
);
// Tạo slice cho dữ liệu chapter
const chapterSlice = createSlice({
  name: "chapter",
  initialState: {
    chapterList: [], // Dữ liệu chapter ban đầu là mảng rỗng
    loading: false, // Trạng thái loading
    error: null, // Thông tin lỗi nếu có
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChapterList.pending, (state, action) => {
        state.loading = true; // Khi bắt đầu fetch dữ liệu
      })
      .addCase(fetchChapterList.fulfilled, (state, action) => {
        state.loading = false; // Khi fetch thành công
        state.chapterList = action.payload; // Lưu dữ liệu vào chapterList
      })
      .addCase(fetchChapterList.rejected, (state, action) => {
        state.loading = false; // Khi fetch bị lỗi
        state.error = action.error.message; // Lưu thông tin lỗi
      });
  },
});

export default chapterSlice.reducer;
