// src/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import './dashboard.css';
import StudentProfile from './student/StudentProfile';
import FeesDetails from './FeesDetails';
import BusDetails from './student/BusDetails';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

function Dashboard() {
  const [activePage, setActivePage] = useState('profile');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'students', user.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData(null);
        }
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Student Dashboard</h2>
        <ul>
          <li onClick={() => setActivePage('profile')}>Student Profile</li>
          <li onClick={() => setActivePage('fees')}>Fees Details</li>
          <li onClick={() => setActivePage('bus')}>Bus Information</li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="main-content">
        {activePage === 'profile' && userData && <StudentProfile data={userData} />}
        {activePage === 'fees' && (
          <div>
            <FeesDetails />
          </div>
        )}
        {activePage === 'bus' && <BusDetails />}
      </div>
    </div>
  );
}

export default Dashboard;