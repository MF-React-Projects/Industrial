import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {useForm} from "react-hook-form";
import axios from "axios";

const AddProduct = () => {
    const navigate = useNavigate();
    const mySwal = withReactContent(Swal);
    const {register, formState: {errors}, handleSubmit, reset} = useForm();
    const imageStorageKey = 'f9cdde2041acd37841b53910325aacd3';

    const onSubmit = data => {
        const img = data.productThumb[0];
        const formData = new FormData();
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const thumbnail = result.data.url;
                    const product = {
                        name: data.productName,
                        price: data.productPrice,
                        image: thumbnail,
                        minQuantity: data.productMinQuantity,
                        inStock: data.productQty,
                        shortDescription: data.productShortDescription,
                    }
                    axios.post('https://immense-savannah-85373.herokuapp.com/products', product, {
                        headers:{
                            'Content-Type': 'application/json',
                            'authorization': 'Bearer ' + localStorage.getItem('accessToken')
                        }
                    })
                        .then(res => {
                            mySwal.fire({
                                title: 'Product Added',
                                text: 'Product has been added successfully',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }).then(() => {
                                navigate('/dashboard/manage-products');
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            })
    }

    return (
        <div>
            <h2 className='text-center p_color mb-3'>Add Product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col lg={6}>
                        <div className='form-group mb-3'>
                            <label htmlFor="name" className="form-label">Name</label>
                            <input className='form-control'
                                   placeholder='Enter product name' {...register("productName", {required: true})} />
                            <small
                                className='text-danger'>{errors.productName?.type === 'required' && "Product name is required"}</small>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className='form-group mb-3'>
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type='number' className='form-control' min='0'
                                   placeholder='Enter product price' {...register("productPrice", {
                                required: true,
                                min: 0
                            })} />
                            <small className='text-danger'>
                                {errors.productPrice?.type === 'required' && "Product price is required"}
                                {errors.productPrice?.type === 'min' && "Product price must be greater than 0"}
                            </small>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className='form-group mb-3'>
                            <label htmlFor="productMinQuantity" className="form-label">Min Order Quantity</label>
                            <input type='number' className='form-control'
                                   placeholder='Enter min order quantity' {...register("productMinQuantity", {
                                required: true,
                                min: 0
                            })} />
                            <small className='text-danger'>
                                {errors.productMinQuantity?.type === 'required' && "Min Order Quantity is required"}
                                {errors.productMinQuantity?.type === 'min' && "Product min order quantity must be greater than 0"}
                            </small>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className='form-group mb-3'>
                            <label htmlFor="productQty" className="form-label">Quantity</label>
                            <input type='number' className='form-control' min='0'
                                   placeholder='Enter product quantity' {...register("productQty", {
                                required: true,
                                min: 0
                            })} />
                            <small className='text-danger'>
                                {errors.productQty?.type === 'required' && "Product quantity is required"}
                                {errors.productQty?.type === 'min' && "Product quantity must be greater than 0"}
                            </small>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className='form-group mb-3'>
                            <label htmlFor="productThumb" className="form-label">Product Thumbnail</label>
                            <input type="file" className='form-control'
                                   placeholder='Enter product thumbnail url' {...register("productThumb", {
                                required: {
                                    value: true,
                                    message: 'Image is Required'
                                }
                            })} />
                            <small
                                className='text-danger'>{errors.productThumb?.type === 'required' && "Product thumbnail url is required"}</small>
                        </div>
                    </Col>
                </Row>

                <div className='form-group mb-3'>
                    <label htmlFor="productShortDescription" className="form-label">Short Description</label>
                    <textarea className='form-control'
                              placeholder='Enter product short description' {...register("productShortDescription", {required: true})} />
                    <small
                        className='text-danger'>{errors.productShortDescription?.type === 'required' && "Product short description is required"}</small>
                </div>

                <Button type='submit' className='btn-default' onClick={onSubmit}>Add Product</Button>
            </form>
        </div>
    );
};

export default AddProduct;