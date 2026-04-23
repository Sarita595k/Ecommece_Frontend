import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            // Your admin route: routes.get("/admin/users", isAuthenticated, authorizedRole('admin'), getAllUsers)
            const { data } = await axios.get('/api/user/admin/users');
            setUsers(data.users);
        } catch (error) {
            console.error("Error fetching users", error.response.data.message);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await axios.delete(`/api/v1/admin/user/delete/${id}`);
            fetchUsers();
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="admin-container">
            <h2>All Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td className={user.role === 'admin' ? 'text-red' : ''}>{user.role}</td>
                            <td>
                                <button onClick={() => deleteHandler(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;