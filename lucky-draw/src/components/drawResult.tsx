import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminDashboard from './adminDashboard';

function LuckyDraw() {
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    // Fetch all users from the server
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/entries');
        setNames(response.data.map(user => user.namex)); // Adjust if the user object structure is different
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let interval;
    if (isDrawing) {
      interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * names.length);
        setCurrentName(names[randomIndex]);
      }, 100); // Speed of scrolling (change if needed)
      
      // Stop after 3 seconds and pick the final name
      setTimeout(() => {
        clearInterval(interval);
        const finalIndex = Math.floor(Math.random() * names.length);
        setCurrentName(names[finalIndex]);
        setIsDrawing(false);
      }, 3000); // Duration of the draw
    }
    return () => clearInterval(interval);
  }, [isDrawing, names]);

  const startDrawing = () => {
    setIsDrawing(true);
  };

  return (
    <>
    {/* <AdminDashboard/> */}
    <div style={styles.container}>
      <h1 style={styles.heading}>Lucky Draw</h1>
      <div style={styles.winnerBox}>
        <p style={styles.winnerText}>{currentName || 'Click Draw to Start!'}</p>
      </div>
      <button onClick={startDrawing} style={styles.button} disabled={isDrawing}>
        {isDrawing ? 'Drawing...' : 'Draw'}
      </button>
    </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#FF5E5E',
    textAlign: 'center',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#FFE15A',
    marginBottom: '2rem',
  },
  winnerBox: {
    border: '5px solid #FFD700',
    borderRadius: '10px',
    padding: '1rem 2rem',
    marginBottom: '2rem',
    backgroundColor: '#FFF',
    width: '50%',
    height: '60px', // Adjust height for consistent display
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  winnerText: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#000',
    animation: 'scroll 1s linear infinite',
  },
  button: {
    padding: '0.5rem 2rem',
    fontSize: '1.5rem',
    color: '#FFF',
    backgroundColor: '#FFB800',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
};

export default LuckyDraw;
