import React from 'react';
import {Table} from "react-bootstrap";
import {useQuery} from "react-query";
import {useAuthState} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../Common/Loading";

const MyOrders = () => {
    const [user] = useAuthState(auth);

    const {data:orders, isLoading} = useQuery('orders', async () => {
        const response = await fetch(`http://localhost:5000/orders/${user?.email}`);
        return await response.json();
    });

    if(isLoading) return <Loading/>;

    const handleCancel = () =>{

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
                                <button className='btn btn-primary btn-sm' onClick={handleCancel}>Cancel</button>
                            </td>
                        </tr>
                    ))
                }
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default MyOrders;