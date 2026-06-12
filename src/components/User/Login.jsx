import React, { useState, useEffect } from 'react'; // Fixed: Added useEffect
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../Actions/UsersActions";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fixed: Declared missing local states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSellerLogin, setIsSellerLogin] = useState(false);

    // Pulling state from Redux
    const { isAuthenticated, error, loading, user } = useSelector(state => state.auth);

    useEffect(() => {
        // Handle redirection once authenticated via Redux state
        if (isAuthenticated && user) {
            if (isSellerLogin && user.role !== 'seller') {
                alert("Access Denied: You are not an seller.");
                return;
            }

            if (user.role === 'Seller' || isSellerLogin) {
                navigate("/Seller/dashboard");
            } else {
                navigate("/");
            }
        }

        if (error) {
            alert(error);
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, error, navigate, user, isSellerLogin]);

    const handleLogin = (e) => {
        e.preventDefault();
        // Fixed: Removed the raw fetch. Redux handles loading and the API call now!
        dispatch(login(email, password));
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-[#0a0a0a] border border-[#004d39] p-8 rounded-sm shadow-2xl">

                {/* Seller Toggle Tab */}
                <div className="flex justify-center mb-6">
                    <button
                        type="button"
                        onClick={() => setIsSellerLogin(false)}
                        className={`px-4 py-1 text-[10px] tracking-[0.2em] uppercase transition-all ${!isSellerLogin ? 'border-b-2 border-[#008080] text-white' : 'text-gray-600'}`}
                    >
                        User
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsSellerLogin(true)}
                        className={`px-4 py-1 text-[10px] tracking-[0.2em] uppercase transition-all ${isSellerLogin ? 'border-b-2 border-[#008080] text-white' : 'text-gray-600'}`}
                    >
                        Seller
                    </button>
                </div>

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white tracking-tighter uppercase">
                        {isSellerLogin ? "Seller " : "Welcome "}
                        <span className="text-[#008080]">{isSellerLogin ? "Portal" : "Back."}</span>
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
                        disabled={loading} // Managed globally by Redux now
                        className={`w-full ${isSellerLogin ? 'bg-[#7a1a1a] hover:bg-[#a12525]' : 'bg-[#006a4e] hover:bg-[#008080]'} text-white py-4 font-black text-xs uppercase tracking-[0.3em] transition-all disabled:opacity-50 shadow-lg`}
                    >
                        {loading ? "Verifying..." : isSellerLogin ? "Secure Login" : "Sign In"}
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