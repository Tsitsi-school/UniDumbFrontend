// import axios from 'axios';
// import API_BASE_URL from './config';

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // API for Flats Management
// export const getFlats = async () => {
//   return axiosInstance.get('/flats');
// };

// export const addFlat = async (flatData) => {
//   return axiosInstance.post('/flats', flatData);
// };

// export const updateFlat = async (id, flatData) => {
//   return axiosInstance.put(`/flats/${id}`, flatData);
// };

// export const deleteFlat = async (id) => {
//   return axiosInstance.delete(`/flats/${id}`);
// };

// // API for Users Management
// export const getUsers = async () => {
//   return axiosInstance.get('/users');
// };

// export const deleteUser = async (id) => {
//   return axiosInstance.delete(`/users/${id}`);
// };

// // API for Bookings Management
// export const getBookings = async () => {
//   return axiosInstance.get('/bookings');
// };

// export const cancelBooking = async (id) => {
//   return axiosInstance.delete(`/bookings/${id}`);
// };

// // API for Image Management
// export const getFlatImages = async (flatId) => {
//   return axiosInstance.get(`/flats/${flatId}/images`);
// };

// export const uploadFlatImage = async (flatId, imageFile) => {
//   const formData = new FormData();
//   formData.append('image', imageFile);
//   return axiosInstance.post(`/flats/${flatId}/upload-image`, formData, {
//     headers: { 'Content-Type': 'multipart/form-data' }
//   });
// };

// export const deleteFlatImage = async (flatId, imageId) => {
//   return axiosInstance.delete(`/flats/${flatId}/images/${imageId}`);
// };

// export default axiosInstance;
