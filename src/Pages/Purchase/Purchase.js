import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import {Col, Container, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useAuthState} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";

const Purchase = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [user] = useAuthState(auth);
    const {image, name, shortDescription, price, minQuantity, inStock} = product;
    //sweetalert
    const mySwal = withReactContent(Swal);

    const {register, formState: {errors}, handleSubmit, reset} = useForm({
        defaultValues: {
            name: user?.displayName,
            email: user?.email,
            qty: minQuantity
        }
    });

    useEffect(() => {
        fetch(`http://localhost:5000/product/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                const {minQuantity} = data;
                reset({
                    name: user?.displayName,
                    email: user?.email,
                    qty: minQuantity
                })
            })
    }, [id, reset, user]);

    const onSubmit = data => {
        const orderData = {
            productId: id,
            ...data,
            totalPrice: price * data.qty,
        };
        fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    //reduce quantity
                    axios.put(`http://localhost:5000/product/${id}`, {
                        inStock: inStock - data.qty
                    })
                        .then(res => {
                            if (res.status === 200) {
                                mySwal.fire({
                                    title: 'Success',
                                    text: 'Your order has been placed successfully',
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                });
                                setProduct({...product, inStock: inStock - data.qty});
                                setBtnDisabled(false);
                                reset();
                            }
                        })
                        .catch(err => console.log(err))
                } else {
                    mySwal.fire({
                        title: 'Error',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
                setBtnDisabled(false);
            })
    }

    const handleQty = (e) => {
        const {value} = e.target;
        if (parseInt(value) >= parseInt(minQuantity) && parseInt(value) <= parseInt(inStock)) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }

    return (
        <>
            <Header/>
            <div className='product-details py-80'>
                <Container>
                    <Row>
                        <Col lg={5}>
                            <div className="product-single-thumb mb-3">
                                <img src={image} alt="product-thumb" className='img-fluid'/>
                            </div>
                            <div className="product-single-content">
                                <h3 className='p_color font-bold'>{name}</h3>
                                <ul className='product-infos list-unstyled ps-0 ms-0 mb-3 d-flex align-items-center justify-content-between'>
                                    <li><b>Price:</b> ${price}</li>
                                    <li><b>Min Quantity:</b> {minQuantity}</li>
                                    <li><b>Stock:</b> {inStock}</li>
                                </ul>
                                <p>{shortDescription}</p>
                            </div>
                        </Col>
                        <Col lg={7}>
                            <div className={'place-order'}>
                                <h3 className='p_color font-bold'>Place Order</h3>
                                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="col-md-6">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder='Enter your name'
                                            {...register("name", {
                                                required: {
                                                    value: true,
                                                    message: 'Name is Required'
                                                }
                                            })}
                                            readOnly
                                        />
                                        <small className="text-danger">
                                            {errors.name?.type === 'required' && errors.name.message}
                                        </small>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder='Enter your email'
                                            {...register("email", {
                                                required: {
                                                    value: true,
                                                    message: 'Email is Required'
                                                },
                                                pattern: {
                                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                                    message: 'Provide a valid Email'
                                                }
                                            })}
                                            readOnly
                                        />
                                        <small className="text-danger">
                                            {errors.email?.type === 'required' && errors.email.message}
                                            {errors.email?.type === 'pattern' && errors.email.message}
                                        </small>
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="phone"
                                            placeholder='Enter your phone'
                                            {...register("phone", {
                                                required: {
                                                    value: true,
                                                    message: 'Phone is Required'
                                                }
                                            })}
                                        />
                                        <small className="text-danger">
                                            {errors.phone?.type === 'required' && errors.phone.message}
                                        </small>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="inputAddress" className="form-label">Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputAddress"
                                            placeholder="Enter your address"
                                            {...register("address", {
                                                required: {
                                                    value: true,
                                                    message: 'Address is Required'
                                                }
                                            })}
                                        />
                                        <small className="text-danger">
                                            {errors.address?.type === 'required' && errors.address.message}
                                        </small>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputCity" className="form-label">City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputCity"
                                            {...register("city")}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="inputState" className="form-label">State</label>
                                        <input type="text" className="form-control"
                                               id="inputState" {...register("state")}/>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="inputZip" className="form-label">Zip</label>
                                        <input type="text" className="form-control" id="inputZip" {...register("zip")}/>
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="qty" className="form-label">Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="qty"
                                            min='1'
                                            placeholder='Enter product quantity'
                                            {...register("qty", {
                                                required: {
                                                    value: true,
                                                    message: 'Quantity is Required'
                                                },
                                                min: {
                                                    value: minQuantity,
                                                    message: `You have to order at least ${minQuantity} products`
                                                },
                                                max: {
                                                    value: inStock,
                                                    message: `Only ${inStock} products are available in stock`
                                                },
                                                onChange: handleQty
                                            })}
                                        />
                                        <small className="text-danger">
                                            {errors.qty?.type === 'required' && errors.qty.message}
                                            {errors.qty?.type === 'min' && errors.qty.message}
                                            {errors.qty?.type === 'max' && errors.qty.message}
                                        </small>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn-default btn-secondary"
                                                disabled={btnDisabled}>Place Order
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer/>
        </>
    );
};

export default Purchase;