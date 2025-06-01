import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../ReduxToolKit/cartSlice';
import Header from '../Components/Header';


const HomePage = () => {
    const [Product, setProduct] = useState([])
    const dispatch = useDispatch()

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products')
            setProduct(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <Header className='mb-5' />
            <div className='d-flex flex-wrap justify-content-center'>
                {Product.map((item) => (
                    <Card
                        className="my-2 ms-2 d-flex flex-column"
                        style={{ width: '18rem', borderColor: 'black', borderWidth: '2px', minHeight: '32rem' }}
                    >
                        <Card.Img className="p-4" variant="top" src={item.image} style={{ height: '15rem' }} />
                        <Card.Body className="d-flex flex-column flex-grow-1">
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text className="flex-grow-1">Price :${item.price}</Card.Text>
                            <Card.Text className="flex-grow-1">Rating :{item.rating.rate}</Card.Text>
                            <div className="d-flex justify-content-center mt-3">
                                <Button onClick={() => dispatch(addToCart(item))} variant="primary">
                                    Add to Cart
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>

    )
}

export default HomePage
