// src/admin/AdminProfile.jsx
import React from 'react';
import './adminprofile.css'; // Assuming you will create this CSS file for styling

function AdminProfile({ data }) {
  // This component will receive admin data via props
  // It will display the admin's name, email, and other relevant information

  if (!data) {
    return <div>Loading admin profile...</div>;
  }

  return (
    <div className="admin-profile">
      <h2>Admin Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Role:</strong> Administrator</p>
        <p><strong>Contact:</strong> {data.contact}</p>
      </div>
    </div>
  );
}

export default AdminProfile;