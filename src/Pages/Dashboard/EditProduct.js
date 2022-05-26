import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {Button, Col, Row} from "react-bootstrap";

const EditProduct = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const mySwal = withReactContent(Swal);

    const {name, price, image, inStock, minQuantity, shortDescription} = product;
    const {register, formState: {errors}, handleSubmit, reset} = useForm({
        defaultValues: {
            productName: name,
            productPrice: price,
            productThumb: image,
            productQty: inStock,
            productMinQuantity: minQuantity,
            productShortDescription: shortDescription,
        }
    });

    useEffect(() => {
        const getProduct = async () => {
            await axios.get(`http://localhost:5000/product/${id}`)
                .then(res => {
                    setProduct(res.data);
                    const {name, price, image, inStock, minQuantity, shortDescription} = res.data;
                    reset({
                        productName: name,
                        productPrice: price,
                        productThumb: image,
                        productQty: inStock,
                        productMinQuantity: minQuantity,
                        productShortDescription: shortDescription,
                    });
                })
                .catch(err => console.log(err));
        }
        getProduct();
    }, [id, reset]);

    const onSubmit = data => {
        const product = {
            name: data.productName,
            price: data.productPrice,
            image: data.productThumb,
            minQuantity: data.productMinQuantity,
            inStock: data.productQty,
            shortDescription: data.productShortDescription,
        }
        if (data.productName && data.productPrice && data.productThumb && data.productMinQuantity && data.productQty && data.productShortDescription) {
            axios.put(`http://localhost:5000/product/edit/${id}`, product)
                .then(res => {
                    mySwal.fire({
                        title: 'Success',
                        text: 'Product has been updated',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        navigate('/dashboard/manage-products');
                    });
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div>
            <h2 className='text-center p_color mb-3'>Edit Product: {name}</h2>
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
                            <input className='form-control'
                                   placeholder='Enter product thumbnail url' {...register("productThumb", {required: true})} />
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

                <Button type='submit' className='btn-default btn-secondary' onClick={onSubmit}>Update Product</Button>
            </form>
        </div>
    );
};

export default EditProduct;