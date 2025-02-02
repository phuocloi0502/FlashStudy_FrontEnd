import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Lấy giá trị của môi trường
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  base: isProduction ? "/FlashStudy_FrontEnd/" : "/", // Dùng '/' cho development và '/FlashStudy_FrontEnd/' cho production
  plugins: [react()],
});
