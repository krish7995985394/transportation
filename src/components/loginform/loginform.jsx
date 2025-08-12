import React, { useState } from 'react';
import './loginform.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      if (!adminEmail.endsWith('@admin.com')) {
        throw new Error('Wrong details entered');
      }
      await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      alert('✅ Admin login successful');
      navigate('/admindashboard');
    } catch (err) {
      console.error(err);
      setError('❌ Wrong details entered for Admin login');
    }
  };

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    try {
      if (!studentEmail.endsWith('@gmail.com')) {
        throw new Error('Wrong details entered');
      }
      await signInWithEmailAndPassword(auth, studentEmail, studentPassword);
      alert('✅ Student login successful');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('❌ Wrong details entered for Student login');
    }
  };

  const pageStyle = {
    backgroundImage: "url('/srgec1.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    backdropFilter: 'blur(5px)',
  };

  return (
    <div style={pageStyle}>
      <div className="top-bar">
        <img src="/logo1.png" alt="Top Logo" className="top-logo" />
      </div>

      <div className="login-forms-container">
        {/* Admin Login */}
        <div className="login-box">
          <h2>Admin Login</h2>
          <form onSubmit={handleAdminLogin}>
            <div className="form-control">
              <label>Email</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label>Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="black-button">Admin Login</button>
          </form>
        </div>

        {/* Student Login */}
        <div className="login-box">
          <h2>Student Login</h2>
          <form onSubmit={handleStudentLogin}>
            <div className="form-control">
              <label>Email</label>
              <input
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label>Password</label>
              <input
                type="password"
                value={studentPassword}
                onChange={(e) => setStudentPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="black-button">Student Login</button>
          </form>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default LoginForm;
