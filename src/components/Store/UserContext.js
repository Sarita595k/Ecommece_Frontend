import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Function to load user data on refresh
    const loadUser = async () => {
        try {
            const { data } = await axios.get('/api/v1/me'); // Calling your /me route
            setUser(data.user);
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, loading }}>
            {children}
        </UserContext.Provider>
    );
};