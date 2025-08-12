import React, { useEffect, useState } from 'react';
import './feesdetails.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function FeesDetails() {
  const [semester, setSemester] = useState('1st Semester');
  const [feesStatus, setFeesStatus] = useState('Unpaid');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchFeesStatus = async (selectedSemester) => {
    setLoading(true);
    setError('');
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const ref = doc(db, 'students', user.email);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        const status = data.fees?.[selectedSemester] || 'Unpaid';
        setFeesStatus(status);
      } else {
        setFeesStatus('Unpaid');
      }
    } catch (err) {
      console.error('Failed to fetch fees status:', err);
      setError('Failed to fetch fees details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentUpdate = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);
    try {
      const ref = doc(db, 'students', user.email);
      await updateDoc(ref, {
        [`fees.${semester}`]: 'Paid'
      });
      setFeesStatus('Paid');
    } catch (err) {
      console.error('Failed to update payment status:', err);
      setError('Payment status update failed. Please contact support.');
    } finally {
      setLoading(false);
      sessionStorage.removeItem('paymentStatus');
    }
  };

  useEffect(() => {
    const paidFlag = sessionStorage.getItem('paymentStatus');
    if (paidFlag === 'paid') {
      handlePaymentUpdate();
    } else {
      fetchFeesStatus(semester);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semester]);

  const handlePay = () => {
    navigate('/payment', { state: { semester } });
  };

  return (
    <div className="fees-details">
      <h2>Bus Fees Payment</h2>

      {error && <div className="error-message">{error}</div>}
      
      <label htmlFor="semester">Select Semester:</label>
      <select
        id="semester"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        disabled={loading}
      >
        <option>1st Semester</option>
        <option>2nd Semester</option>
       
      </select>

      <div style={{ marginTop: 12 }}>
        Status:{' '}
        {loading ? (
          <span style={{ color: 'gray', fontWeight: 600 }}>Loading...</span>
        ) : feesStatus === 'Paid' ? (
          <span style={{ color: 'green', fontWeight: 600 }}>Paid ✅</span>
        ) : (
          <span style={{ color: 'crimson', fontWeight: 600 }}>Unpaid ❌</span>
        )}
      </div>

      {feesStatus === 'Unpaid' && !loading && (
        <button style={{ marginTop: 16 }} onClick={handlePay}>
          Pay Now
        </button>
      )}
    </div>
  );
}

export default FeesDetails;