// src/admin/AdminProfile.jsx
import React from 'react';
// Optional: import './AdminProfile.css'; for styling

function AdminProfile({ data }) {
  if (!data) {
    return <div>Loading admin profile...</div>;
  }

  return (
    <div className="admin-profile">
      <h2>Admin Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {data.name || 'N/A'}</p>
        <p><strong>Email:</strong> {data.email || 'N/A'}</p>
        <p><strong>Role:</strong> Administrator</p>
        <p><strong>Contact:</strong> {data.contact || 'N/A'}</p>
      </div>
    </div>
  );
}

export default AdminProfile;
