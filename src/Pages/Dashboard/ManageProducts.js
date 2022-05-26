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
        axios.get("http://localhost:5000/products")
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const deleteProduct = (id) => {
        //confirm before delete
        const confirm = window.confirm("Are you sure you want to delete this product?");
        if (confirm) {
            axios.delete(`http://localhost:5000/products/${id}`)
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
    }

    const editProduct = (id) => {
        navigate(`/dashboard/edit-product/${id}`);
    }
    return (
        <div>
            <h2 className='text-center p_color mb-3'>Manage Products</h2>
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