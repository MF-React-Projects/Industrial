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
    const mySwal = withReactContent(Swal);

    const {data: orders, isLoading, refetch} = useQuery('orders', async () => {
        const response = await fetch(`https://industrial.onrender.com/orders/${user?.email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
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
                fetch(`https://industrial.onrender.com/order/${orderId}`, {
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
            <h2 className='text-center p_color mb-3'>My Orders</h2>
            {
                (orders.length !==0) ? <div className={'table-responsive'}> <Table striped bordered hover>
                    <thead align={'center'} valign={'center'}>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody align={'center'} valign={'middle'}>
                    {
                        orders.map((order, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img src={order.productImage} alt={order.productName} width={'60px'}/>
                                        <h6 className={'ms-2 mb-0'}>{order.productName}</h6>
                                    </div>
                                </td>
                                <td>{order.qty}</td>
                                <td>{order.totalPrice}</td>
                                <td>
                                    {
                                        !order.paid ?
                                            <>
                                                <button className='btn btn-danger btn-sm me-2' onClick={() => handleCancel(order)}>Cancel</button>
                                                <button className='btn btn-primary btn-sm' onClick={() => navigate(`/dashboard/payment/${order._id}`)}>Pay</button>
                                            </> :
                                            <span className='badge bg-success py-2 px-3'>Paid</span>
                                    }

                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table></div> : <h5 className='text-center'>No Orders Found</h5>
            }
        </div>
    );
};

export default MyOrders;