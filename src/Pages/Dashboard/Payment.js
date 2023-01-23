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

    const {data: order, isLoading} = useQuery(['order', id], () =>{
        return fetch(`https://industrial.onrender.com/order/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    })

    if(isLoading) return <Loading/>

    const {productName, productImage, productPrice, totalPrice, qty} = order;
    return (
        <div className={'payment py-3 px-3'}>
            <Row>
                <Col lg={6}>
                    <div className="order-review mb-4">
                        <h3 className={'mb-3 p_color'}>Order Review</h3>
                        <div className="order-review-item d-flex align-items-center">
                            <div className="order-review-item-img me-3">
                                <img src={productImage} alt="" width={150}/>
                            </div>
                            <div className="order-review-item-info">
                                <h4>{productName}</h4>
                                <p className='mb-2'>Quantity: {qty}</p>
                                <p className='mb-2'>Price: ${productPrice}</p>
                                <p className='mb-2'>Total: ${totalPrice}</p>
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