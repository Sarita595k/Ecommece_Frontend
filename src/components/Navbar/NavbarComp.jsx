import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'; // 1. Imported useDispatch
import { logout } from '../../Actions/UsersActions'; // 2. Imported logout action

const NavbarComp = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch(); // 3. Initialized dispatch

    // Pull authentication and user object directly from Redux state
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    // 4. Handle Logout Click
    const handleLogout = () => {
        dispatch(logout());
        setIsOpen(false); // Close mobile menu if open
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#050505] border-b border-[#004d39] shadow-lg">
            <div className="container mx-auto px-4 md:px-12">
                <div className="flex items-center justify-between h-20">

                    {/* 1. Brand Logo */}
                    <Link to="/" className="flex items-center gap-3 no-underline group">
                        <div className="w-10 h-10 bg-[#011812] rounded-sm flex items-center justify-center text-white font-black text-xl group-hover:bg-[#008080] transition-all duration-300 shadow-lg shadow-[#006a4e]/10">
                            A
                        </div>
                        <span className="text-2xl font-bold tracking-tighter text-white uppercase">
                            AVSAR<span className="text-[#008080]">.</span>
                        </span>
                    </Link>

                    {/* 2. Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-10">
                        {['Home', 'Shop', 'Products'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className="text-gray-300 hover:text-[#008080] font-semibold no-underline transition-colors text-xs uppercase tracking-[0.25em]"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* 3. Desktop Action Icons & Dynamic Auth Status */}
                    <div className="hidden lg:flex items-center gap-8">
                        {/* Search */}
                        <button className="text-gray-400 hover:text-[#008080] transition-colors">
                            <FaSearch size={18} />
                        </button>

                        {/* Cart */}
                        <Link to="/cart" className="relative text-gray-400 hover:text-[#008080] transition-colors no-underline">
                            <FaShoppingCart size={20} />
                            <span className="absolute -top-3 -right-3 bg-[#008080] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-[#050505]">
                                0
                            </span>
                        </Link>

                        {/* Subtle Bottle Green Divider */}
                        <div className="h-6 w-[1px] bg-[#004d39]"></div>

                        {/* Conditional Auth Section */}
                        <div className="flex items-center gap-4">
                            {isAuthenticated && user ? (
                                <div className="flex items-center gap-4">
                                    <Link
                                        to={user.role === 'seller' ? "/seller/dashboard" : "/"}
                                        className="flex items-center gap-2 border border-[#008080]/40 hover:border-[#008080] bg-[#011812] text-white px-4 py-2 rounded-sm font-bold no-underline text-xs uppercase tracking-widest transition-all"
                                    >
                                        <FaUserCircle size={14} className="text-[#008080]" />
                                        Hi, <span className="text-[#008080]">{user.name.split(' ')} {user.role === 'seller' && '(Seller)'}</span>
                                    </Link>

                                    <button onClick={handleLogout} className="...">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-300 hover:text-white font-bold no-underline text-xs uppercase tracking-widest">
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-[#006a4e] text-white px-7 py-2.5 rounded-sm font-black no-underline text-xs uppercase tracking-widest hover:bg-[#008080] transition-all shadow-md shadow-[#006a4e]/20"
                                    >
                                        Join Now
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Interaction Icons */}
                    <div className="lg:hidden flex items-center gap-6">
                        <Link to="/cart" className="relative text-[#008080]">
                            <FaShoppingCart size={22} />
                        </Link>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
                        </button>
                    </div>
                </div>

                {/* 4. Mobile Navigation Overlay */}
                <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden bg-[#050505] ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col gap-6 py-12 px-6">
                        <Link to="/" className="text-white text-lg font-bold tracking-[0.2em] no-underline border-b border-[#004d39] pb-3" onClick={() => setIsOpen(false)}>HOME</Link>
                        <Link to="/shop" className="text-white text-lg font-bold tracking-[0.2em] no-underline border-b border-[#004d39] pb-3" onClick={() => setIsOpen(false)}>SHOP</Link>
                        <Link to="/products" className="text-white text-lg font-bold tracking-[0.2em] no-underline border-b border-[#004d39] pb-3" onClick={() => setIsOpen(false)}>PRODUCTS</Link>

                        {/* Mobile Auth Management */}
                        <div className="flex flex-col gap-4 mt-6">
                            {isAuthenticated && user ? (
                                <>
                                    <Link
                                        to={user.role === 'seller' ? "/seller/dashboard" : "/"}
                                        className="text-center py-4 border border-[#008080] text-white font-bold no-underline tracking-widest uppercase text-sm bg-[#011812]"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Dashboard ({user.name.split(' ')})
                                    </Link>

                                    {/* 6. Mobile Logout Button */}
                                    <button
                                        onClick={handleLogout}
                                        className="text-center py-4 bg-red-950/40 hover:bg-red-900/60 text-red-400 font-bold border border-red-900/50 tracking-widest uppercase text-sm transition-colors rounded-sm cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-center py-4 border border-[#008080] text-[#008080] font-bold no-underline tracking-widest uppercase text-sm" onClick={() => setIsOpen(false)}>Login</Link>
                                    <Link to="/register" className="text-center py-4 bg-[#006a4e] text-white font-bold no-underline tracking-widest uppercase text-sm" onClick={() => setIsOpen(false)}>Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComp;