import React, {useState} from 'react';
import {Table} from "react-bootstrap";
import {useQuery} from "react-query";
import Loading from "../Common/Loading";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ManageUsers = () => {
    const mySwal = withReactContent(Swal);
    const {data: orders, isLoading, refetch} = useQuery('orders', () => fetch('https://industrial.onrender.com/orders', {
        method: 'GET',
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
        .then(res => res.json()));

    const deleteOrder = order => {
        //confirmation before deleting
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
                fetch(`https://industrial.onrender.com/order/${order._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    refetch();
                });
            }
        })
    }

    const shipOrder = order => {
        fetch(`https://industrial.onrender.com/order/${order._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                status: 'approved'
            })
        }).then(() => {
            refetch();
        });
    }

    if (isLoading) return <Loading/>;

    return (
        <div>
            <h2 className='text-center p_color mb-3'>Manage Orders</h2>
            <Table striped bordered hover responsive>
                <thead align={'center'} valign={'center'}>
                <tr>
                    <th>#</th>
                    <th>Customer Name</th>
                    <th>Customer Email</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody align={'center'} valign={'middle'}>
                {
                    orders.map((order, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>{order.qty}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                                {order.paid ?
                                    <>
                                        <span className='badge bg-success mx-1'>Paid</span>
                                        {
                                            order.status === 'approved' ?
                                                <span className='badge bg-success mx-1'>Shipped</span> :
                                                <span className='badge bg-info mx-1'>Pending</span>
                                        }
                                    </> :
                                    <span className='badge bg-warning'>Unpaid</span>
                                }
                            </td>
                            <td>
                                {
                                    order.paid ?
                                        <>
                                            {
                                                order.status !== 'approved' && <button className='btn btn-primary btn-sm' onClick={() => shipOrder(order)}>Ship
                                                    order</button>
                                            }
                                        </>
                                        :
                                        <button className='btn btn-danger btn-sm' onClick={() => deleteOrder(order)}>Delete</button>

                                }
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>
    );
};

export default ManageUsers;