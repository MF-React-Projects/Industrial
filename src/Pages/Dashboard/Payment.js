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
    // const [order, setOrder] = useState({});

    const {data: order, isLoading} = useQuery(['order', id], () => fetch(`http://localhost:5000/order/${id}`)
            .then(res => res.json()));

    const {productId, name, email, qty, phone, address, totalPrice} = order;

    const {data: product, isLoading: isLoadingProduct} = useQuery(['product', productId], () =>{
        return fetch(`http://localhost:5000/product/${productId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
    })

    if(isLoading || isLoadingProduct) return <Loading/>;

    return (
        <div className={'payment py-5 px-5'}>
            <Row>
                <Col lg={6}>
                    <div className="order-review">
                        <h3>Order Review</h3>
                        <div className="order-review-item">
                            <div className="order-review-item-img">
                                <img src={product.image} alt=""/>
                            </div>
                            <div className="order-review-item-info">
                                <h4>{product.name}</h4>
                                <p>Quantity: {order.qty}</p>
                                <p>Price: ${product.price}</p>
                            </div>
                        </div>
                        <div className="order-review-total">
                            <h4>Total: ${product.price * order.qty}</h4>
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