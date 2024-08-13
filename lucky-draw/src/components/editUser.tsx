// src/EditUserPage.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './adminDashboard';

const EditUserPage = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/entries');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditUser(user);
        setName(user.name);
        setPhone(user.phone);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/entries/${editUser._id}`, { name, phone });
            setUsers(users.map(user => (user._id === editUser._id ? { ...user, name, phone } : user)));
            setEditUser(null);
            setName('');
            setPhone('');
        } catch (error) {
            alert('Error updating user:', error.response?.data?.message || error.message);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:5000/api/entries/${userId}`);
                setUsers(users.filter(user => user._id !== userId));
            } catch (error) {
                alert('Error deleting user:', error.response?.data?.message || error.message);
            }
        }
    };

    return (
        <>
        <AdminDashboard/>
        <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-gray-800 bg-opacity-50">
            <div className="relative z-10 w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Edit Users</h1>
                
                {/* User Table */}
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Phone</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map(user => (
                                <tr key={user._id}>
                                    <td className="border border-gray-300 p-2">{user.name}</td>
                                    <td className="border border-gray-300 p-2">{user.phone}</td>
                                    <td className="border border-gray-300 p-2 flex justify-center">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="text-green-500 hover:text-green-700 mx-2"
                                        >
                                            <i className="fas fa-edit"></i> {/* FontAwesome Edit Icon */}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="text-red-500 hover:text-red-700 mx-2"
                                        >
                                            <i className="fas fa-trash"></i> {/* FontAwesome Trash Icon */}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="border border-gray-300 p-2 text-center">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Edit Form */}
                {editUser && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Edit User</h2>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="edit-name">Name:</label>
                            <input
                                type="text"
                                id="edit-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full border border-gray-300 p-2 rounded"
                                required
                            />
                            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="edit-phone">Phone:</label>
                            <input
                                type="text"
                                id="edit-phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="block w-full border border-gray-300 p-2 rounded"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                            >
                                Update
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
                        </>
    );
};

export default EditUserPage;
