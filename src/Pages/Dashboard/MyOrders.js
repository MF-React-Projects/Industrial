import React from 'react';
import {Table} from "react-bootstrap";

const MyOrders = () => {
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