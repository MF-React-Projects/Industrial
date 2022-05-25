import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import Loading from "../Common/Loading";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import {Col, Row} from "react-bootstrap";

const stripePromise = loadStripe('pk_test_hNWYmz6pmum0Z3ywANVmTzbA00fSin7xRC');

const Payment = () => {
    const {id} = useParams();
    const [order, setOrder] = useState({});

    useEffect(() => {
        const fetchOrder = async () => {
            const response = await fetch(`http://localhost:5000/order/${id}`);
            const data = await response.json();
            setOrder(data);
        };
        fetchOrder();
    }, [id]);

    // const {data: order, isLoading} = useQuery(['order', id], () => fetch(`http://localhost:5000/order/${id}`)
    //     .then(res => res.json()));

    const {productId, name, email} = order;

    const {data: product, isLoading: isLoadingProduct} = useQuery(['product', productId], () => {
        return fetch(`http://localhost:5000/product/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
    })

    if (isLoadingProduct) return <Loading/>;

    return (
        <div className={'payment py-3 px-3'}>
            <Row>
                <Col lg={6}>
                    <div className="order-review mb-4">
                        <h3 className={'mb-3 p_color'}>Order Review</h3>
                        <div className="order-review-item d-flex align-items-center">
                            <div className="order-review-item-img me-3">
                                <img src={product.image} alt="" width={150}/>
                            </div>
                            <div className="order-review-item-info">
                                <h4>{product.name}</h4>
                                <p className='mb-2'>Quantity: {order.qty}</p>
                                <p className='mb-2'>Price: ${product.price}</p>
                                <p className='mb-2'>Total: ${product.price * order.qty}</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={order}/>
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;