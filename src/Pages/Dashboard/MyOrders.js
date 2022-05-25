import React from 'react';
import {Table} from "react-bootstrap";
import {useQuery} from "react-query";
import {useAuthState} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../Common/Loading";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    //sweetalert
    const mySwal = withReactContent(Swal);
    const {data: orders, isLoading, refetch} = useQuery('orders', async () => {
        const response = await fetch(`http://localhost:5000/orders/${user?.email}`);
        return await response.json();
    });

    if (isLoading) return <Loading/>;

    const handleCancel = order => {
        const orderId = order._id;
        //confirmation before cancelling
        mySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.value) {
                //cancel order
                fetch(`http://localhost:5000/order/${orderId}`, {
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

    return (
        <div>
            <h2 className='text-center p_color'>My Orders</h2>
            <Table striped responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Quantity</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    orders.map((order, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>{order.phone}</td>
                            <td>{order.qty}</td>
                            <td>
                                <button className='btn btn-danger btn-sm me-2' onClick={() => handleCancel(order)}>Cancel</button>
                                <button className='btn btn-primary btn-sm' onClick={() => navigate(`/dashboard/payment/${order._id}`)}>Pay</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>
    );
};

export default MyOrders;