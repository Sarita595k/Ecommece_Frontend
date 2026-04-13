import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Import Pagination from react-bootstrap specifically
import { Card, Button, Row, Col, Container, Alert, Spinner, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Actions/productActions";

const ProductCard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    // Pulling productsCount and resPerPage from the store
    const { loading, products, error, productsCount, resPerPage } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts(currentPage));
    }, [dispatch, currentPage]);

    // Logic to calculate total pages
    const totalPages = Math.ceil(productsCount / (resPerPage || 4));

    const handlePageChange = (pageNumber) => {
        if (pageNumber !== currentPage) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <Container>
            <h1 className="my-4">Products</h1>

            {error && (
                <Alert variant="danger" className="text-center">
                    <strong>Error: </strong> {error}
                </Alert>
            )}

            {loading ? (
                <div className="d-flex justify-content-center my-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <>
                    <Row>
                        {products && products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                                <Card border="light" className="shadow-sm h-100">
                                    <Card.Img
                                        variant="top"
                                        src={product.images[0]?.url}
                                        alt={product.name}
                                        style={{ height: '200px', objectFit: 'contain' }}
                                    />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text className="fw-bold mt-auto">
                                            ₹{product.price}
                                        </Card.Text>
                                        <Button
                                            as={Link}
                                            to={`/product/${product._id}`}
                                            variant="outline-primary"
                                            size="sm"
                                        >
                                            View Details
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* NEW BOOTSTRAP PAGINATION SECTION */}
                    {productsCount > resPerPage && (
                        <div className="d-flex justify-content-center mt-5 mb-5">
                            <Pagination>
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
                </>
            )}
        </Container>
    );
};

export default ProductCard;