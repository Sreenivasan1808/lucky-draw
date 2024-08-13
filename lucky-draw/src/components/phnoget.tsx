import React, { useState } from 'react';
import axios from 'axios';

const SendOtp = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    setError('');
    try {
      const response = await axios.post('/api/send-otp', { mobileNumber });
      if (response.data.success) {
        setOtpSent(true);
        alert(`OTP sent: ${response.data.otp}`); // This alert is just for testing; remove in production
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Send OTP</h2>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Mobile Number:</label>
        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <button onClick={handleSendOtp} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Send OTP
      </button>
      {otpSent && <p style={{ color: 'green', marginTop: '10px' }}>OTP sent successfully!</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default SendOtp;
