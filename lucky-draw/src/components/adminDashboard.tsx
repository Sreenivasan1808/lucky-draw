// src/AdminDashboard.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminDashboard = () => {
    const [entries, setEntries] = useState([]);
    const [winners, setWinners] = useState([]);
    const navigate = useNavigate();

    const fetchEntries = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/entries');
            setEntries(response.data);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/entries/${id}`);
            setEntries(entries.filter(entry => entry._id !== id));
        } catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    const handleDrawWinners = async () => {
        // try {
        //     const response = await axios.post('http://localhost:5000/api/draw-winners');
        //     console.log("Namma win pannitom")
        //     setWinners(response.data);
        //     console.log(winners)
        // } catch (error) {
        //     console.error('Error drawing winners:', error);
        // }
        navigate('/draw-winners');
    };

    const handleLogout = () => {
        localStorage.removeItem('adminLoggedIn');
        navigate('/');
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Fixed Top Navbar */}
            <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Admin Dashboard</h1>
                    <button
                        onClick={handleDrawWinners}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Draw Winners
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <main className="flex-1 mt-16 p-4">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold mb-4 mt-5">Entry Management</h2>
                    
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border-b">Name</th>
                                <th className="p-2 border-b">Phone</th>
                                <th className="p-2 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry) => (
                                <tr key={entry._id} className="border-b">
                                    <td className="p-2">{entry.name}</td>
                                    <td className="p-2">{entry.phone}</td>
                                    <td className="p-2 flex space-x-2">
                                        <button
                                            className="text-green-500 hover:text-green-600"
                                            onClick={() => navigate(`/edit-entry/${entry._id}`)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-600"
                                            onClick={() => handleDelete(entry._id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {winners.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-xl font-bold mb-2">Winners</h2>
                            <ul>
                                {winners.map(winner => (
                                    <li key={winner._id} className="border-b p-2">{winner.name} - {winner.phone}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
