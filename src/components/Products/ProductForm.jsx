import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../Actions/ProductActions';

const ProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Electronics');
    const [stock, setStock] = useState('');
    const [seller, setSeller] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const categories = [
        "Electronics", "Cameras", "Laptop", "Phone", "Accessories",
        "Headphones", "Books", "Clothes/Shoes", "Beauty/Health", "Sports", "Outdoor"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            name,
            price: Number(price),
            description,
            category,
            stock: Number(stock),
            seller, // Tracks the plain text string display name (e.g. "Avsar Corp")
            images: [
                {
                    public_id: `prod_${Date.now()}`,
                    url: imageUrl || "https://via.placeholder.com/150"
                }
            ]
        };

        // Dispatch the action asynchronously to make sure it saves before navigating
        await dispatch(createProduct(productData));
        alert("Product Created Successfully!");
        navigate('/seller/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full bg-[#0a0a0a] border border-[#004d39] p-8 rounded-sm shadow-2xl">
                <h2 className="text-2xl font-black tracking-widest text-center uppercase mb-8">
                    Create New <span className="text-[#008080]">Product</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">Product Name</label>
                        <input
                            type="text"
                            required
                            maxLength={100}
                            placeholder="e.g. Mechanical Cyber Keyboard"
                            className="w-full bg-[#050505] border border-[#004d39] focus:border-[#008080] p-3 text-xs tracking-wider outline-none text-white transition-colors"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">Price (₹)</label>
                            <input
                                type="number"
                                required
                                placeholder="0.00"
                                className="w-full bg-[#050505] border border-[#004d39] focus:border-[#008080] p-3 text-xs tracking-wider outline-none text-white transition-colors"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">Stock Inventory</label>
                            <input
                                type="number"
                                required
                                placeholder="Available count"
                                className="w-full bg-[#050505] border border-[#004d39] focus:border-[#008080] p-3 text-xs tracking-wider outline-none text-white transition-colors"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">Category</label>
                            <select
                                className="w-full bg-[#050505] border border-[#004d39] focus:border-[#008080] p-3 text-xs tracking-wider outline-none text-gray-300 transition-colors cursor-pointer"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat} className="bg-[#0a0a0a] text-white">
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">Seller / Brand Name</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Avsar Corp"
                                className="w-full bg-[#050505] border border-[#004d39] focus:border-[#008080] p-3 text-xs tracking-wider outline-none text-white transition-colors"
                                value={seller}
                                onChange={(e) => setSeller(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">Image URL</label>
                        <input
                            type="url"
                            required
                            placeholder="https://images.unsplash.com/photo-..."
                            className="w-full bg-[#050505] border border-[#004d39] focus:border-[#008080] p-3 text-xs tracking-wider outline-none text-white transition-colors"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] tracking-widest text-gray-400 uppercase mb-2">Product Description</label>
                        <textarea
                            rows="4"
                            required
                            placeholder="Write comprehensive specifications here..."
                            className="w-full bg-[#050505] border border-[#004d39] focus:border-[#008080] p-3 text-xs tracking-wider outline-none text-white transition-colors resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#006a4e] hover:bg-[#008080] text-white py-4 font-black text-xs uppercase tracking-[0.3em] transition-all shadow-lg mt-4"
                    >
                        Publish Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;