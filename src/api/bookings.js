import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api"; // Change this to match backend URL

export const getBookings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
};

export const getBookingDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking details:', error);
    return null;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    return null;
  }
};

export const updateBooking = async (id, bookingData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/bookings/${id}`, bookingData);
    return response.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    return null;
  }
};

export const cancelBooking = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/bookings/${id}`);
  } catch (error) {
    console.error('Error canceling booking:', error);
  }
};