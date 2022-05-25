import React, {useEffect, useState} from 'react';
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";

const CheckoutForm = ({order}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const {_id, totalPrice, name, email} = order;

    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
        setSuccess('');
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
            setSuccess('');
            setProcessing(false);
        } else {
            setCardError('');
            setTransactionId(paymentIntent.id);
            setSuccess('Congratulations! Your payment is completed.');

            //store payment details in database
            fetch(`http://localhost:5000/order/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order: _id,
                    transactionId: paymentIntent.id
                })
            })
                .then(res => res.json())
                .then(data => {
                    setProcessing(false);
                    console.log(data);
                })
        }

    };
    return (
        <>
            <form onSubmit={handleSubmit}>
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
                <button className='btn btn-success btn-sm mt-4' type="submit"
                        disabled={!stripe || !elements || !clientSecret}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-red-500'>{cardError}</p>
            }
            {
                success && <div className='text-green-500'>
                    <p>{success} </p>
                    <p>Your transaction Id: <span className="text-orange-500 font-bold">{transactionId}</span> </p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;