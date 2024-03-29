import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const mySwal = withReactContent(Swal);

    useEffect(() => {
        axios.get("https://industrial.onrender.com/products")
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const deleteProduct = (id) => {
        //confirm before delete
        mySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.value) {
                axios.delete(`https://industrial.onrender.com/product/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => {
                        setProducts(products.filter(product => product._id !== id));
                        mySwal.fire({
                            title: "Deleted!",
                            text: "Product has been deleted successfully",
                            icon: "success",
                            confirmButtonText: "OK"
                        });
                    })
                    .catch(err => console.log(err));
            }
        });

    }

    const editProduct = (id) => {
        navigate(`/dashboard/edit-product/${id}`);
    }

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className='text-center mb-0 p_color'>Manage Products</h2>
                <button className='btn-default btnSm' onClick={() => navigate('/dashboard/add-product')}>Add Product</button>
            </div>
            <Table striped bordered hover responsive>
                <thead align={'center'} valign={'center'}>
                <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Min Order Quantity</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody align={'center'} valign={'middle'}>
                {products.map((product, index) => (
                    <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>
                            <div className="d-flex align-items-center">
                                <img src={product.image} alt="product" className="img-fluid" width="50" height="50"/>
                                <h6 className="mb-0 ms-3">{product.name}</h6>
                            </div>
                        </td>
                        <td>${product.price}</td>
                        <td>{product.minQuantity}</td>
                        <td>{product.inStock}</td>
                        <td>
                            <button onClick={() => editProduct(product._id)} className='btn btn-primary btn-sm me-3'>Edit
                            </button>
                            <button onClick={() => deleteProduct(product._id)}
                                    className='btn btn-danger btn-sm'>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ManageProducts;