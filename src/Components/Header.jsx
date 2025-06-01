import React from 'react'
import { Navbar, Container, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const cart = useSelector((state) => state.cart)
    const navigate = useNavigate()

    return (
        <>
            <Navbar variant="dark" bg="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Redux Project</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-dark-example" />
                    <Button className='ms-auto' variant="outline-light" onClick={() => navigate('/cart')}>Cart {cart.totalQuantity}</Button>
                </Container>
            </Navbar>

        </>
    )
}

export default Header
