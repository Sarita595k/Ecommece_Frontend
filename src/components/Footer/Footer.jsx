import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#050505] border-t border-[#004d39] text-gray-400 font-sans pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-12">

                {/* 1. Top Section: Brand & Newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-16 border-b border-[#1a1d13]">
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-3 no-underline mb-6">
                            <div className="w-10 h-10 bg-[#006a4e] rounded-sm flex items-center justify-center text-white font-black text-xl">
                                A
                            </div>
                            <span className="text-2xl font-bold tracking-tighter text-white uppercase">
                                AVSAR<span className="text-[#008080]">.</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Premium curated fashion and technology. Elevating your lifestyle with the perfect blend of Bottle Green aesthetics and Teal innovation.
                        </p>
                    </div>

                    <div className="lg:col-span-2">
                        <h5 className="text-white uppercase tracking-[0.2em] text-xs font-bold mb-6">Subscribe to our Newsletter</h5>
                        <form className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="ENTER YOUR EMAIL"
                                className="flex-grow bg-[#0a0a0a] border border-[#004d39] px-6 py-4 text-xs tracking-widest text-white outline-none focus:border-[#008080] transition-all rounded-sm"
                            />
                            <button className="bg-[#006a4e] text-white px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-[#008080] transition-all rounded-sm shadow-lg shadow-[#006a4e]/20">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* 2. Middle Section: Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16">
                    {/* Shop Column */}
                    <div>
                        <h6 className="text-white text-[10px] uppercase tracking-[0.3em] font-black mb-6">Shop</h6>
                        <ul className="list-none p-0 space-y-4 text-xs uppercase tracking-widest">
                            <li><Link to="/products" className="hover:text-[#008080] no-underline transition-colors">All Products</Link></li>
                            <li><Link to="/shop" className="hover:text-[#008080] no-underline transition-colors">New Arrivals</Link></li>
                            <li><Link to="/shop" className="hover:text-[#008080] no-underline transition-colors">Best Sellers</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h6 className="text-white text-[10px] uppercase tracking-[0.3em] font-black mb-6">Support</h6>
                        <ul className="list-none p-0 space-y-4 text-xs uppercase tracking-widest">
                            <li><Link to="/about" className="hover:text-[#008080] no-underline transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-[#008080] no-underline transition-colors">Contact</Link></li>
                            <li><Link to="/terms" className="hover:text-[#008080] no-underline transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div className="col-span-2 md:col-span-2 md:pl-10">
                        <h6 className="text-white text-[10px] uppercase tracking-[0.3em] font-black mb-6">Get in Touch</h6>
                        <div className="space-y-4 text-xs tracking-widest leading-loose">
                            <p className="flex items-center gap-3"><FaMapMarkerAlt className="text-[#008080]" /> 123 Tech Avenue, Bengaluru, India</p>
                            <p className="flex items-center gap-3"><FaPhone className="text-[#008080]" /> +91 87708 72054</p>
                            <p className="flex items-center gap-3"><FaEnvelope className="text-[#008080]" /> support@avsar.com</p>
                        </div>
                    </div>
                </div>

                {/* 3. Bottom Section: Socials & Copyright */}
                <div className="pt-8 border-t border-[#1a1d13] flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-0">
                        © 2026 AVSAR E-COMMERCE. ALL RIGHTS RESERVED.
                    </p>

                    <div className="flex gap-6">
                        <a href="#" className="text-gray-500 hover:text-[#008080] transition-colors"><FaFacebook size={18} /></a>
                        <a href="#" className="text-gray-500 hover:text-[#008080] transition-colors"><FaTwitter size={18} /></a>
                        <a href="#" className="text-gray-500 hover:text-[#008080] transition-colors"><FaInstagram size={18} /></a>
                        <a href="#" className="text-gray-500 hover:text-[#008080] transition-colors"><FaLinkedin size={18} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};


export default Footer;