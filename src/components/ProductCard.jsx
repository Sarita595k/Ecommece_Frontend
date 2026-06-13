import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Container, Alert, Spinner, Pagination, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Actions/productActions";
import { FaStar } from "react-icons/fa";

const ProductCard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    // Pulling live products from Redux store
    const { loading, products, error, productsCount, resPerPage } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts(currentPage));
    }, [dispatch, currentPage]);

    const realProducts = products && products.products ? products.products : (Array.isArray(products) ? products : []);

    // products lists 
    const fallbackProducts = [
        {
            _id: "mock_id_1",
            name: "SteelSeries Apex Pro Mechanical Keyboard - OmniPoint Adjustable Switches",
            price: 15499,
            oldPrice: 18999,
            category: "Electronics",
            ratings: 4.6,
            numOfReviews: 2450,
            stock: 45,
            images: [{ url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=500&auto=format&fit=crop" }]
        },
        {
            _id: "mock_id_2",
            name: "Sony Alpha 7 IV Full-Frame Mirrorless Interchangeable Lens Camera Body",
            price: 219999,
            oldPrice: 242999,
            category: "Cameras",
            ratings: 4.8,
            numOfReviews: 712,
            stock: 4,
            images: [{ url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop" }]
        },
        {
            _id: "mock_id_3",
            name: "Apple MacBook Pro 14-inch Laptop - M3 Max chip, 1TB SSD Space Black",
            price: 199900,
            oldPrice: 224900,
            category: "Laptop",
            ratings: 4.9,
            numOfReviews: 340,
            stock: 8,
            images: [{ url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500&auto=format&fit=crop" }]
        },
        {
            _id: "mock_id_4",
            name: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 12GB RAM, 256GB Storage)",
            price: 129999,
            oldPrice: 139999,
            category: "Phone",
            ratings: 4.7,
            numOfReviews: 1890,
            stock: 15,
            images: [{ url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=500&auto=format&fit=crop" }]
        },
        {
            _id: "mock_id_5",
            name: "Sony WH-1000XM5 Wireless Noise Cancelling Over-Ear Headphones",
            price: 29999,
            oldPrice: 34999,
            category: "Headphones",
            ratings: 4.5,
            numOfReviews: 4120,
            stock: 22,
            images: [{ url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop" }]
        },
        {
            _id: "mock_id_6",
            name: "Anker Prime 20,000mAh Power Bank - 200W Ultra-Fast Smart Display Charging",
            price: 8999,
            oldPrice: 11999,
            category: "Accessories",
            ratings: 4.4,
            numOfReviews: 532,
            stock: 3,
            images: [{ url: "https://images.unsplash.com/photo-1609592424085-f5b2dc3e8d25?q=80&w=500&auto=format&fit=crop" }]
        },
        {
            _id: "mock_id_7",
            name: "Nike Air Max Alpha Trainer 5 Mens Dynamic Cross Training Shoes",
            price: 7495,
            oldPrice: 8995,
            category: "Clothes/Shoes",
            ratings: 4.2,
            numOfReviews: 915,
            stock: 50,
            images: [{ url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop" }]
        },
        {
            _id: "mock_id_8",
            name: "CeraVe Moisturizing Cream - Intensive Daily Face and Body Moisturizer",
            price: 1450,
            oldPrice: 1850,
            category: "Beauty/Health",
            ratings: 4.6,
            numOfReviews: 12450,
            stock: 120,
            images: [{ url: "https://images.unsplash.com/photo-1608248597481-496100c8c836?q=80&w=500&auto=format&fit=crop" }]
        },
        {
            _id: "mock_id_9",
            name: "Wilson Evolution Indoor Game Official Composite Leather Basketball",
            price: 4500,
            oldPrice: 5200,
            category: "Sports",
            ratings: 4.7,
            numOfReviews: 310,
            stock: 0, // Mocking out of stock status
            images: [{ url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=500&auto=format&fit=crop" }]
        },
        // {
        //     _id: "mock_id_10",
        //     name: "Osprey Atmos AG 65 Mens Backpacking & Outdoor Expedition Rucksack",
        //     price: 24999,
        //     oldPrice: 27999,
        //     category: "Outdoor",
        //     ratings: 4.8,
        //     numOfReviews: 420,
        //     stock: 7,
        //     images: [{ url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500&auto=format&fit=crop" }]
        // }
    ];

    // Auto-switches dynamically if backend is empty
    const productArray = realProducts.length > 0 ? realProducts : fallbackProducts;
    const totalPages = Math.ceil((productsCount || productArray.length) / (resPerPage || 3));

    const handlePageChange = (pageNumber) => {
        if (pageNumber !== currentPage) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="bg-[#050505] min-h-screen py-8 text-white">
            <Container>
                {/* Search Header Info */}
                {/* <div className="d-flex justify-content-between align-items-center border-b border-[#004d39]/40 pb-3 mb-6">
                    <p className="text-gray-400 text-xs m-0 uppercase tracking-wider">
                        Results: Showing {productArray.length} items
                    </p>
                    {realProducts.length === 0 && (
                        <span className="text-[#008080] text-[10px] bg-[#011812] px-3 py-1 border border-[#004d39] uppercase tracking-wider font-bold">
                            ⚡ Catalog Sandbox Active (10 Products)
                        </span>
                    )}
                </div> */}

                {error && (
                    <Alert variant="danger" className="bg-[#1a0505] text-red-400 border border-red-900 text-center font-bold text-xs tracking-wide uppercase py-3 rounded-none mb-6">
                        <strong>System Alert: </strong> {error}
                    </Alert>
                )}

                {loading ? (
                    <div className="d-flex justify-content-center my-5 py-20">
                        <Spinner animation="border" className="text-[#008080]" />
                    </div>
                ) : (
                    /* Grid Layout displaying 3 items per row on Desktop (lg=4) */
                    <Row className="g-4">
                        {productArray.map((product) => (
                            <Col key={product._id} xs={12} md={6} lg={4}>
                                <Card className="bg-[#0a0a0a] border border-[#004d39]/50 hover:border-[#008080] h-100 transition-all duration-300 rounded-sm shadow-md flex flex-col group overflow-hidden">

                                    {/* Product Image Panel */}
                                    <div className="bg-[#0e0e0e] p-3 flex items-center justify-center relative aspect-square border-b border-[#004d39]/20 overflow-hidden">
                                        <Link to={`/product/${product._id}`} className="w-full h-full flex items-center justify-center">
                                            <img
                                                src={product.images && product.images[0] ? product.images[0].url : "https://via.placeholder.com/300"}
                                                alt={product.name}
                                                className="img-fluid max-h-[220px] object-contain transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </Link>

                                        {/* Deal Tag Percent Overlay */}
                                        {product.oldPrice && product.price && (
                                            <span className="absolute top-3 left-3 bg-[#008080] text-black text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-xs">
                                                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% Deal
                                            </span>
                                        )}
                                    </div>

                                    {/* Meta Content Details Area */}
                                    <Card.Body className="p-4 flex flex-col flex-grow bg-[#0a0a0a]">
                                        <span className="text-gray-500 text-[9px] uppercase tracking-widest font-bold mb-1 block">
                                            {product.category}
                                        </span>

                                        <Link
                                            to={`/product/${product._id}`}
                                            className="text-sm font-medium text-gray-200 hover:text-[#008080] no-underline leading-snug line-clamp-2 h-10 mb-2 block transition-colors"
                                        >
                                            {product.name}
                                        </Link>

                                        {/* Amazon/Flipkart Style Rating Row */}
                                        <div className="d-flex items-center gap-2 mb-3">
                                            <div className="bg-[#ff9f00] text-black text-[11px] font-black px-1.5 py-0.5 rounded-sm d-flex items-center gap-0.5">
                                                {product.ratings || "4.2"} <FaStar size={9} className="mb-0.5" />
                                            </div>
                                            <span className="text-gray-500 text-xs font-medium">
                                                ({(product.numOfReviews || 24).toLocaleString()})
                                            </span>
                                        </div>

                                        {/* Price and Stock Metrics Footer Stack */}
                                        <div className="mt-auto pt-3 border-t border-[#004d39]/20">
                                            <div className="d-flex items-baseline gap-2 mb-1">
                                                <span className="text-xl font-black text-white font-mono">
                                                    ₹{product.price?.toLocaleString()}
                                                </span>
                                                {product.oldPrice && (
                                                    <span className="text-xs text-gray-500 line-through font-mono">
                                                        ₹{product.oldPrice.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-[10px] text-gray-400 font-medium m-0 tracking-wide">
                                                {product.stock > 0 ? "🚚 FREE Delivery tomorrow" : "❌ Out of Stock"}
                                            </p>

                                            {product.stock > 0 && product.stock <= 10 && (
                                                <span className="text-amber-500 text-[9px] font-bold uppercase tracking-wider block mt-1">
                                                    Only {product.stock} left in stock - order soon!
                                                </span>
                                            )}

                                            <Button
                                                as={Link}
                                                to={`/product/${product._id}`}
                                                className="bg-[#011812] hover:bg-[#006a4e] text-white border border-[#004d39] hover:border-[#008080] font-bold text-[10px] uppercase tracking-widest py-2 mt-3 rounded-none transition-all w-full text-center block no-underline"
                                            >
                                                View Offer
                                            </Button>
                                        </div>

                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}

                {/* Pagination (Visible only if using database values) */}
                {productsCount > resPerPage && realProducts.length > 0 && (
                    <div className="d-flex justify-content-center mt-10">
                        <Pagination className="custom-pagination">
                            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                            {[...Array(totalPages).keys()].map((number) => (
                                <Pagination.Item
                                    key={number + 1}
                                    active={number + 1 === currentPage}
                                    onClick={() => handlePageChange(number + 1)}
                                >
                                    {number + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                        </Pagination>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default ProductCard;