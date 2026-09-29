import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Set default axios base configuration
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('liva_admin_token') || null);
    const [loading, setLoading] = useState(true);

    // Apply token to axios headers
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('liva_admin_token', token);
            fetchUserProfile();
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('liva_admin_token');
            setUser(null);
            setLoading(false);
        }
    }, [token]);

    const fetchUserProfile = async () => {
        try {
            const res = await axios.get('/api/auth/me');
            if (res.data.status === 'success') {
                setUser(res.data.data);
            }
        } catch (err) {
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                logout();
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await axios.post('/api/auth/login', { email, password });
        if (res.data.status === 'success') {
            const { token: newToken, user: userData } = res.data.data;
            setToken(newToken);
            setUser(userData);
            return res.data;
        }
        throw new Error(res.data.message || 'Login gagal');
    };

    const logout = async () => {
        try {
            if (token) {
                await axios.post('/api/auth/logout');
            }
        } catch (e) {
            // silent ignore
        } finally {
            setToken(null);
            setUser(null);
        }
    };

    const verifyPin = async (pin) => {
        const res = await axios.post('/api/auth/verify-pin', { pin });
        return res.data;
    };

    const updateProfile = async (profileData) => {
        const res = await axios.post('/api/auth/profile', profileData);
        if (res.data.status === 'success') {
            setUser(res.data.data);
        }
        return res.data;
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            isAuthenticated: !!token && !!user,
            login,
            logout,
            verifyPin,
            updateProfile,
            refetchUser: fetchUserProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
