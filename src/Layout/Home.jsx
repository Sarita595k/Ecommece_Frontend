import { Card, Button } from "react-bootstrap"

const Home = () => {
    return (
        <>
            <h1>Products</h1>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" />
                <Card.Body>
                    <Card.Title>Watches</Card.Title>
                    <Card.Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, placeat.
                    </Card.Text>
                    <Button variant="primary">Add to Cart</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default Home