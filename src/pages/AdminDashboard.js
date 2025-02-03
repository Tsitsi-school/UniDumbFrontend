import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';


function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/admin/manage-flats">Manage Flats</Link>
      <Link to="/admin/manage-users">Manage Users</Link>
      <Link to="/admin/manage-bookings">View All Bookings</Link>
      <Link to="/admin/manage-images">View All Images</Link>
    </div>
  );
}

export default AdminDashboard;