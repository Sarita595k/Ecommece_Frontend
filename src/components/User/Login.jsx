import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { FaUserShield } from 'react-icons/fa'; // Icon for Admin

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdminLogin, setIsAdminLogin] = useState(false); // New State
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/api/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                // Check if user is actually an admin if they toggled the Admin Login
                if (isAdminLogin && data.user.role !== 'admin') {
                    alert("Access Denied: You are not an admin.");
                    return;
                }

                // Redirect based on role or toggle
                if (data.user.role === 'admin' || isAdminLogin) {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/');
                }
            } else {
                alert(data.message || "Login Failed");
            }
        } catch (error) {
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-[#0a0a0a] border border-[#004d39] p-8 rounded-sm shadow-2xl">

                {/* Admin Toggle Tab */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setIsAdminLogin(false)}
                        className={`px-4 py-1 text-[10px] tracking-[0.2em] uppercase transition-all ${!isAdminLogin ? 'border-b-2 border-[#008080] text-white' : 'text-gray-600'}`}
                    >
                        User
                    </button>
                    <button
                        onClick={() => setIsAdminLogin(true)}
                        className={`px-4 py-1 text-[10px] tracking-[0.2em] uppercase transition-all ${isAdminLogin ? 'border-b-2 border-[#008080] text-white' : 'text-gray-600'}`}
                    >
                        Admin
                    </button>
                </div>

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white tracking-tighter uppercase">
                        {isAdminLogin ? "Admin " : "Welcome "}
                        <span className="text-[#008080]">{isAdminLogin ? "Portal" : "Back."}</span>
                    </h2>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-4 text-[#006a4e]" />
                        <input
                            type="email"
                            placeholder="EMAIL ADDRESS"
                            required
                            className="w-full bg-transparent border-b border-[#004d39] py-3 pl-10 text-white text-xs tracking-widest focus:border-[#008080] outline-none transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <FaLock className="absolute left-3 top-4 text-[#006a4e]" />
                        <input
                            type="password"
                            placeholder="PASSWORD"
                            required
                            className="w-full bg-transparent border-b border-[#004d39] py-3 pl-10 text-white text-xs tracking-widest focus:border-[#008080] outline-none transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="text-right">
                        <Link to="/password/forgot" className="text-[10px] text-[#008080] uppercase tracking-widest hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full ${isAdminLogin ? 'bg-[#7a1a1a] hover:bg-[#a12525]' : 'bg-[#006a4e] hover:bg-[#008080]'} text-white py-4 font-black text-xs uppercase tracking-[0.3em] transition-all disabled:opacity-50 shadow-lg`}
                    >
                        {loading ? "Verifying..." : isAdminLogin ? "Secure Login" : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-gray-500 text-[10px] mt-8 tracking-widest uppercase">
                    New to Avsar? <Link to="/register" className="text-white font-bold hover:text-[#008080]">Join Now</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;