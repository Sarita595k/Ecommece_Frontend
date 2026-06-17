import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaTrash, FaPen, FaBoxOpen } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const SellerDashboard = () => {
    const { user } = useSelector(state => state.auth);
    const [myProducts, setMyProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSellerProducts = async () => {
        try {
            setLoading(true);
            // Added timestamp parameter to prevent old browser caches from hiding your new additions
            const { data } = await axios.get(`/api/products?t=${Date.now()}`, { withCredentials: true });

            // Filters products where the linked system profile matched the logged-in merchant ID
            const filtered = data.products.filter(prod => prod.user === user?._id);
            setMyProducts(filtered);
        } catch (error) {
            console.error("Error pulling catalog history records:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to permanently delete this inventory listing?")) {
            try {
                await axios.delete(`/api/product/${id}`, { withCredentials: true });
                alert("Listing dropped successfully.");
                fetchSellerProducts();
            } catch (error) {
                alert("Failed to remove target entity records.");
            }
        }
    };

    useEffect(() => {
        if (user?._id) {
            fetchSellerProducts();
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-[#050505] text-white px-4 md:px-12 py-12">
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-[#004d39]">
                    <div>
                        <h2 className="text-2xl font-black tracking-widest uppercase flex items-center gap-3">
                            <FaBoxOpen className="text-[#008080]" /> Seller Hub: <span className="text-[#008080]">My Catalog</span>
                        </h2>
                        <p className="text-gray-500 text-[10px] uppercase tracking-wider mt-1">
                            Logged in as marketplace partner: <strong className="text-white">{user?.name}</strong>
                        </p>
                    </div>

                    <Link
                        to="/seller/product/new"
                        className="flex items-center gap-2 bg-[#006a4e] hover:bg-[#008080] text-white text-xs font-black uppercase tracking-widest px-5 py-3 rounded-sm transition-all shadow-md no-underline"
                    >
                        <FaPlus size={12} /> Add New Product
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-500 tracking-widest text-xs uppercase">
                        Loading merchant ledger accounts...
                    </div>
                ) : myProducts.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 tracking-widest text-xs uppercase border border-[#004d39] bg-[#0a0a0a]">
                        You haven't listed any products yet. Click "Add New Product" to start selling.
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-[#0a0a0a] border border-[#004d39] shadow-2xl rounded-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#004d39] bg-[#011812]">
                                    <th className="p-4 text-[10px] font-black tracking-widest uppercase text-gray-400">Image</th>
                                    <th className="p-4 text-[10px] font-black tracking-widest uppercase text-gray-400">Title</th>
                                    <th className="p-4 text-[10px] font-black tracking-widest uppercase text-gray-400">Price</th>
                                    <th className="p-4 text-[10px] font-black tracking-widest uppercase text-gray-400">Stock Status</th>
                                    <th className="p-4 text-[10px] font-black tracking-widest uppercase text-gray-400">Category</th>
                                    <th className="p-4 text-[10px] font-black tracking-widest uppercase text-gray-400 text-center">Controls</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#004d39]/30">
                                {myProducts.map(product => (
                                    <tr key={product._id} className="hover:bg-[#011812]/40 transition-colors">

                                        {/* FIXED: Reading from index position 0 of the image array stack */}
                                        <td className="p-4">
                                            <img
                                                src={
                                                    product.images?.[0]?.url ||
                                                    "https://via.placeholder.com/50"
                                                }
                                                alt={product.name}
                                                className="w-10 h-10 object-contain bg-[#050505] rounded-xs border border-[#004d39]"
                                            />
                                        </td>

                                        <td className="p-4 text-xs font-bold tracking-wide text-white max-w-[280px] truncate">
                                            {product.name}
                                        </td>

                                        <td className="p-4 text-xs font-mono tracking-wider text-[#008080] font-bold">
                                            ₹{product.price?.toLocaleString()}
                                        </td>

                                        <td className="p-4 text-xs font-mono tracking-wide">
                                            <span className={product.stock > 0 ? "text-gray-300" : "text-red-400 font-bold"}>
                                                {product.stock > 0 ? `${product.stock} units` : 'Out of Stock'}
                                            </span>
                                        </td>

                                        <td className="p-4 text-xs tracking-wide text-gray-400">
                                            {product.category}
                                        </td>

                                        <td className="p-4">
                                            <div className="flex justify-center items-center gap-4">
                                                <Link
                                                    to={`/seller/product/edit/${product._id}`}
                                                    className="text-gray-400 hover:text-[#008080] transition-colors"
                                                >
                                                    <FaPen size={12} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                    className="text-gray-500 hover:text-red-500 bg-transparent border-none outline-none cursor-pointer transition-colors"
                                                >
                                                    <FaTrash size={12} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellerDashboard;