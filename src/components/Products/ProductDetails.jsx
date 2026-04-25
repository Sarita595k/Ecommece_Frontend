import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productDetails, clearErrors } from "../../Actions/productActions";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FaShoppingCart, FaStar, FaShieldAlt, FaTruck } from "react-icons/fa";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector((state) => state.productDetails);

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(productDetails(id));
        if (error) {
            console.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, id, error]);

    const increaseQty = () => {
        if (product.stock <= quantity) return;
        setQuantity(quantity + 1);
    };

    const decreaseQty = () => {
        if (1 >= quantity) return;
        setQuantity(quantity - 1);
    };

    return (
        <div className="bg-[#050505] min-h-screen py-10 text-white">
            <Container>
                {loading ? (
                    <div className="flex justify-center items-center h-[60vh]">
                        <Spinner animation="border" className="text-[#008080]" />
                    </div>
                ) : (
                    <Row className="bg-[#0a0a0a] rounded-sm border border-[#004d39] overflow-hidden shadow-2xl">
                        {/* Left: Product Image */}
                        <Col lg={6} className="p-0 bg-white flex items-center justify-center min-h-[400px]">
                            <img
                                src={product.images && product.images.url}
                                alt={product.name}
                                className="max-w-full max-h-[500px] object-contain p-10 transition-transform duration-500 hover:scale-105"
                            />
                        </Col>

                        {/* Right: Product Info */}
                        <Col lg={6} className="p-8 md:p-12 border-l border-[#004d39]">
                            <span className="text-[#008080] text-xs font-bold uppercase tracking-[0.2em]">
                                {product.category}
                            </span>
                            <h1 className="text-4xl font-bold mt-2 mb-4 tracking-tighter uppercase">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < Math.floor(product.ratings) ? "fill-current" : "text-gray-700"} />
                                    ))}
                                </div>
                                <span className="text-gray-500 text-sm">({product.numOfReviews} Reviews)</span>
                            </div>

                            <div className="mb-8">
                                <span className="text-gray-400 text-sm">Special Price</span>
                                <h2 className="text-5xl font-black text-[#008080]">₹{product.price?.toLocaleString()}</h2>
                            </div>

                            <p className="text-gray-400 leading-relaxed mb-8 border-b border-[#004d39] pb-8">
                                {product.description}
                            </p>

                            {/* Qty and Stock Section */}
                            <div className="flex items-center gap-10 mb-10">
                                <div className="flex items-center border border-[#004d39] rounded-sm">
                                    <button onClick={decreaseQty} className="px-4 py-2 hover:bg-[#004d39] transition-colors">-</button>
                                    <input type="number" value={quantity} readOnly className="w-12 text-center bg-transparent outline-none pointer-events-none" />
                                    <button onClick={increaseQty} className="px-4 py-2 hover:bg-[#004d39] transition-colors">+</button>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase">Availability</span>
                                    <span className={`font-bold uppercase text-xs tracking-widest ${product.stock > 0 ? "text-[#008080]" : "text-red-500"}`}>
                                        {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4">
                                <button
                                    disabled={product.stock === 0}
                                    className="flex-1 bg-[#006a4e] text-white py-4 font-black uppercase tracking-widest text-xs hover:bg-[#008080] transition-all disabled:opacity-50"
                                >
                                    <FaShoppingCart className="inline mr-2" /> Add to Cart
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-[#004d39] pt-8">
                                <div className="flex items-center gap-3 text-gray-500 text-[10px] uppercase tracking-widest">
                                    <FaTruck className="text-[#008080] text-lg" /> Fast Delivery
                                </div>
                                <div className="flex items-center gap-3 text-gray-500 text-[10px] uppercase tracking-widest">
                                    <FaShieldAlt className="text-[#008080] text-lg" /> Secure Payment
                                </div>
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default ProductDetails;
// end of product details 