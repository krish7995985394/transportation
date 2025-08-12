// src/PaymentPage.jsx
import React from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from './firebase';

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSemester = location.state?.semester || '1st Semester';

  const handlePaymentComplete = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, 'students', user.email);
      await updateDoc(docRef, {
        [`fees.${selectedSemester}`]: 'Paid',
      });
    }

    navigate('/dashboard', { state: { paidSemester: selectedSemester } });
  };

  return (
    <div className="payment-page">
      <h2>Complete Your Payment</h2>
      <p>Choose payment method (mock):</p>
      <ul>
        <li>✅ UPI</li>
        <li>✅ Credit/Debit Card</li>
      </ul>
      <button onClick={handlePaymentComplete}>Payment Completed</button>
    </div>
  );
}

export default PaymentPage;
