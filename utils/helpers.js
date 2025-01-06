// import { jwtDecode } from "jwt-decode";

// export const getToken = () => {
//   const token = localStorage.getItem("token");
//   return token;
// };
// export const getTokenDecode = () => {
//   const token = getToken();

//   try {
//     const decoded = jwtDecode(token);
//     return decoded;
//     console.log(decoded); // In ra nội dung của token đã giải mã
//   } catch (error) {
//     return null;
//   }
// };
// export const isLogged = () => {
//   const token = getTokenDecode();
//   try {
//     return token?.data?.rules == "ADMIN" || token?.data?.rules == "MANAGER";
//   } catch (error) {
//     return false;
//   }
// };
