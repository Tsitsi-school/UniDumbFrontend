import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBookings, getBookingDetails, updateBooking, cancelBooking } from "../api/bookings";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Typography, Select, MenuItem
} from "@mui/material";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updatedBooking, setUpdatedBooking] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
    fetchBookings();
  }, []);

  const handleSelectBooking = async (id) => {
    try {
      const bookingDetails = await getBookingDetails(id);
      setSelectedBooking(bookingDetails);
      setUpdatedBooking({ ...bookingDetails });
      setIsEditing(false);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const handleUpdateBooking = async () => {
    try {
      await updateBooking(selectedBooking.id, updatedBooking);
      alert("Booking updated successfully");
      const data = await getBookings(); // Refresh list
      setBookings(data);
      setSelectedBooking(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      await cancelBooking(id);
      alert("Booking canceled successfully");
      setBookings(bookings.filter((booking) => booking.id !== id));
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Manage Bookings
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/admin/add-booking")}
        sx={{ mb: 2 }}
      >
        + Add New Booking
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Flat</strong></TableCell>
              <TableCell><strong>User</strong></TableCell>
              <TableCell><strong>Start Date</strong></TableCell>
              <TableCell><strong>End Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.flatName || "N/A"}</TableCell>
                <TableCell>{booking.userName || "N/A"}</TableCell>
                <TableCell>{booking.startDate}</TableCell>
                <TableCell>{booking.endDate}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleSelectBooking(booking.id)} sx={{ mr: 1 }}>
                    View
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleCancelBooking(booking.id)}>
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Booking Details */}
      {selectedBooking && (
        <Paper sx={{ mt: 3, p: 3 }}>
          <Typography variant="h5">Booking Details</Typography>
          <p><strong>Booking ID:</strong> {selectedBooking.id}</p>
          <p><strong>User:</strong> {selectedBooking.userName} ({selectedBooking.userEmail})</p>
          <p><strong>Flat:</strong> {selectedBooking.flatName} ({selectedBooking.flatLocation})</p>
          <p><strong>Price:</strong> ${selectedBooking.flatPrice}</p>
          <p><strong>Start Date:</strong> {selectedBooking.startDate}</p>
          <p><strong>End Date:</strong> {selectedBooking.endDate}</p>
          <p><strong>Status:</strong> {selectedBooking.status}</p>
          <p><strong>System:</strong> {selectedBooking.system}</p>

          <Button variant="contained" onClick={() => setIsEditing(true)} sx={{ mt: 2, mr: 2 }}>
            Edit Booking
          </Button>
          <Button variant="outlined" color="error" onClick={() => handleCancelBooking(selectedBooking.id)}>
            Cancel Booking
          </Button>
        </Paper>
      )}

      {/* Edit Booking Form */}
      {isEditing && selectedBooking && (
        <Paper sx={{ mt: 3, p: 3 }}>
          <Typography variant="h5">Edit Booking</Typography>

          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={updatedBooking.startDate || ""}
            onChange={(e) => setUpdatedBooking({ ...updatedBooking, startDate: e.target.value })}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={updatedBooking.endDate || ""}
            onChange={(e) => setUpdatedBooking({ ...updatedBooking, endDate: e.target.value })}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />

          <Typography>Status:</Typography>
          <Select
            fullWidth
            value={updatedBooking.status || ""}
            onChange={(e) => setUpdatedBooking({ ...updatedBooking, status: e.target.value })}
            sx={{ mb: 2 }}
          >
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="CANCELED">Canceled</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
          </Select>

          <Button variant="contained" onClick={handleUpdateBooking} sx={{ mr: 2 }}>
            Save Changes
          </Button>
          <Button variant="outlined" color="error" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </Paper>
      )}
    </DashboardLayout>
  );
}

export default ManageBookings;
