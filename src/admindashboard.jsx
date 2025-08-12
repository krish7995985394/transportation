// src/admindashboard.jsx
import React, { useEffect, useState } from 'react';
import './admindashboard.css';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

function AdminDashboard() {
  const [activePage, setActivePage] = useState('profile');
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch admin data from Firestore (assuming a 'admins' collection)
        const docRef = doc(db, 'admins', user.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAdminData(docSnap.data());
        } else {
          // If user is not an admin, redirect them
          navigate('/admin');
        }
      } else {
        // Redirect to admin login if no user is authenticated
        navigate('/admin');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  return (
    <div className="admindashboard-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActivePage('profile')}>Admin Profile</li>
          <li onClick={() => setActivePage('manage-students')}>Manage Students</li>
          <li onClick={() => setActivePage('view-payments')}>View Payments</li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="main-content">
        {activePage === 'profile' && <AdminProfile data={adminData} />}
        {activePage === 'manage-students' && <div>Manage Students Content</div>}
        {activePage === 'view-payments' && <div>View Payments Content</div>}
      </div>
    </div>
  );
}

export default AdminDashboard;