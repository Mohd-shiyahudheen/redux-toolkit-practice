import React from 'react'
import Header from '../Components/Header'
import { useSelector, useDispatch } from 'react-redux';
import { decreaseQuantity, addToCart, removeFromCart, clearCart } from '../ReduxToolKit/cartSlice';
import { Container, Row, Col, Card, ListGroup, Badge, Button } from 'react-bootstrap';

const CartView = () => {
    const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);
    const dispatch = useDispatch();


    return (
        <>
            <Header />
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                    <Card style={{borderBlockColor:"black",borderRadius:"2px"}}>
                        <Card.Header as="h2" className="d-flex justify-content-between align-items-center">
                            Your Cart
                            <Badge pill bg="secondary">
                                {totalQuantity} items
                            </Badge>
                        </Card.Header>
                        <ListGroup variant="flush">
                            {items.length === 0 ? (
                                <ListGroup.Item>Your cart is empty.</ListGroup.Item>
                            ) : (
                                items.map(item => (
                                    <ListGroup.Item
                                        key={item.id}
                                        className="d-flex align-items-center justify-content-between py-3"
                                    >
                                        {/* Image */}
                                        <div className="flex-shrink-0 me-3 d-flex align-items-center" style={{ width: 100, height: 100 }}>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-grow-1 me-3">
                                            <strong>{item.title}</strong>
                                            <div className="text-muted mt-1">
                                                ${item.price} x {item.quantity} = <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="d-flex align-items-center">
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => dispatch(decreaseQuantity(item.id))}
                                            >-</Button>
                                            <Button
                                                variant="success"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => dispatch(addToCart(item))}
                                            >+</Button>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => dispatch(removeFromCart(item.id))}
                                            >Remove</Button>
                                        </div>
                                    </ListGroup.Item>
                                ))
                            )}
                        </ListGroup>
                        <Card.Footer className="d-flex justify-content-between align-items-center">
                            <h4 className="mb-0">Total: ${totalAmount.toFixed(2)}</h4>
                            <Button
                                variant="danger"
                                onClick={() => dispatch(clearCart())}
                                disabled={items.length === 0}
                            >
                                Clear Cart
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
                </Row>
            </Container>
        </>
    )
}

export default CartView
