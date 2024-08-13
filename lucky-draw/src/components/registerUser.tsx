// src/RegistrationForm.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [entries, setEntries] = useState([]);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isPhoneChecked, setIsPhoneChecked] = useState(false);
    const navigate = useNavigate();

    const validatePhone = (phone) => phone.length === 10;

    const checkPhoneExists = async (phone) => {
        try {
            const response = await axios.get('http://localhost:5000/api/entries');
            const phoneExists = response.data.some(entry => entry.phone === phone);
            setIsPhoneValid(!phoneExists);
            setIsPhoneChecked(true);
        } catch (error) {
            console.error('Error checking phone number:', error);
        }
    };

    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value;
        setPhone(phoneValue);
        setIsPhoneChecked(false); // Reset phone checked status
        if (validatePhone(phoneValue)) {
            checkPhoneExists(phoneValue);
        } else {
            setIsPhoneValid(true); // Allow submission if phone is invalid (for easier testing)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validatePhone(phone)) {
            alert('Phone number must be exactly 10 digits.');
            return;
        }

        if (!isPhoneValid) {
            alert('Phone number already given.');
            return;
        }

        try {
            // Skip database insertion if name is 'admin' and phone is '1234567890'
            if (name === 'admin' && phone === '1234567890') {
                localStorage.setItem('adminLoggedIn', 'true');
                navigate('/admin-dashboard');
                return;
            }

            // Post entry to the database
            await axios.post('http://localhost:5000/api/entries', { name, phone });
            setEntries([...entries, { name, phone }]);

            // Reset form fields
            setName('');
            setPhone('');
            setIsPhoneChecked(false); // Reset phone checked status after successful submission
        } catch (error) {
            alert(error.response?.data?.message || 'Error adding entry.');
        }
    };

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/entries');
                setEntries(response.data);
            } catch (error) {
                console.error('Error fetching entries:', error);
            }
        };

        fetchEntries();
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-gray-800 bg-opacity-50">
            {/* Background Video */}
            <div className="absolute inset-0 overflow-hidden">
                <video className="w-full h-full object-cover" autoPlay muted loop>
                    <source src="/background.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Form and Entries Display */}
            <div className="relative z-10 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Lucky Draw Registration</h1>
                <form onSubmit={handleSubmit} className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full border border-gray-300 p-2 rounded mb-4"
                        required
                    />
                    <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="phone">Mobile Number:</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        className={`block w-full border border-gray-300 p-2 rounded mb-4 ${!isPhoneValid && isPhoneChecked ? 'border-red-500' : ''}`}
                        required
                        maxLength="10"
                    />
                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white py-2 rounded ${(!validatePhone(phone) || !isPhoneValid) ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'}`}
                        disabled={!validatePhone(phone) || !isPhoneValid}
                    >
                        Submit
                    </button>
                </form>

                <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">Registered Entries</h2>
                    <ul>
                        {entries.length > 0 ? (
                            entries.map((entry, index) => (
                                <li key={index} className="border-b border-gray-200 py-2">
                                    <span className="font-medium">{entry.name}</span> - <span>{entry.phone}</span>
                                </li>
                            ))
                        ) : (
                            <p>No entries found.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
