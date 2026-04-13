import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/api/user/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (data.success) {
                alert("Registration Successful!");
                navigate('/login');
            } else {
                alert(data.message || "Registration Failed");
            }
        } catch (error) {
            console.error("Register Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-[#0a0a0a] border border-[#004d39] p-8 rounded-sm shadow-2xl">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white tracking-tighter uppercase">
                        Create <span className="text-[#008080]">Account.</span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-2">Become a member of Avsar Boutique</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="relative">
                        <FaUser className="absolute left-3 top-4 text-[#006a4e]" />
                        <input
                            type="text"
                            name="name"
                            placeholder="FULL NAME"
                            required
                            className="w-full bg-transparent border-b border-[#004d39] py-3 pl-10 text-white text-xs tracking-widest focus:border-[#008080] outline-none transition-colors"
                            value={userData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-4 text-[#006a4e]" />
                        <input
                            type="email"
                            name="email"
                            placeholder="EMAIL ADDRESS"
                            required
                            className="w-full bg-transparent border-b border-[#004d39] py-3 pl-10 text-white text-xs tracking-widest focus:border-[#008080] outline-none transition-colors"
                            value={userData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <FaLock className="absolute left-3 top-4 text-[#006a4e]" />
                        <input
                            type="password"
                            name="password"
                            placeholder="PASSWORD"
                            required
                            minLength="6"
                            className="w-full bg-transparent border-b border-[#004d39] py-3 pl-10 text-white text-xs tracking-widest focus:border-[#008080] outline-none transition-colors"
                            value={userData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#006a4e] text-white py-4 font-black text-xs uppercase tracking-[0.3em] hover:bg-[#008080] transition-all disabled:opacity-50 shadow-lg shadow-[#006a4e]/20"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>

                <p className="text-center text-gray-500 text-[10px] mt-8 tracking-widest uppercase">
                    Already a member? <Link to="/login" className="text-white font-bold hover:text-[#008080]">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;