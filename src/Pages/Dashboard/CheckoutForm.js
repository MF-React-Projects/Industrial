import React, {useEffect, useState} from 'react';
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import Loading from "../Common/Loading";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const CheckoutForm = ({order}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const mySwal = withReactContent(Swal);
    const navigate = useNavigate();

    const {_id, totalPrice, name, email} = order;

    useEffect(() => {
        fetch('https://immense-savannah-85373.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
            body: JSON.stringify({totalPrice})
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            })
    }, [totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!elements || !stripe) {
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        setCardError(error?.message || '');
        setSuccess(false);
        setProcessing(true);

        //confirm payment
        const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: name,
                        email: email
                    },
                },
            },
        );

        if(intentError) {
            setCardError(intentError?.message);
            setSuccess(false);
            setProcessing(false);
        } else {
            setCardError('');
            //sweet alert
            mySwal.fire({
                title: 'Payment Successful',
                text: 'Your payment is successful. Your transaction Id is ' + paymentIntent.id,
                icon: 'success',
                confirmButtonText: 'OK'
            })
                .then(() => {
                    setSuccess(true);
                    setProcessing(false);
                    navigate('/dashboard/my-orders');
                })

            //store payment details in database
            fetch(`https://immense-savannah-85373.herokuapp.com/order/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: JSON.stringify({
                    order: _id,
                    transactionId: paymentIntent.id
                })
            })
                .then(res => res.json())
                .then(data => {
                    setProcessing(false);
                })
        }

    };
    return (
        <>
            <form onSubmit={handleSubmit} className={'mb-3'}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className={`btn-default-2 btnSm mt-4 ${processing ? 'btn-loading' : ''}`} type="submit"
                        disabled={!stripe || !elements || !clientSecret}>
                    Pay
                </button>
            </form>
            {
                cardError && <small className='text-danger'>{cardError}</small>
            }
        </>
    );
};

export default CheckoutForm;