import React, {useState} from 'react';
import {Table} from "react-bootstrap";
import {useQuery} from "react-query";
import Loading from "../Common/Loading";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ManageUsers = () => {
    const mySwal = withReactContent(Swal);
    const {data: users, isLoading, refetch} = useQuery('users', () => fetch('http://localhost:5000/users', {
        method: 'GET',
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
        .then(res => res.json()));

    //make admin
    const makeAdmin = user => {
        fetch(`http://localhost:5000/user/admin/${user.email}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    mySwal.fire({
                        title: 'Error',
                        text: 'You are not authorized to make this user an admin',
                        icon: 'error'
                    })
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
                mySwal.fire({
                    title: 'Success',
                    text: 'User is now an admin',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                refetch()
            })
    };

    const removeAdmin = async user => {
        await fetch(`http://localhost:5000/user/remove-admin/${user.email}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    mySwal.fire({
                        title: 'Error',
                        text: 'You are not authorized to remove admin role from this user',
                        icon: 'error'
                    })
                }
                return res.json()
            })
            .then(data => {
                mySwal.fire({
                    title: 'Success',
                    text: 'Admin role removed from user',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                refetch()
            })
    }

    const deleteUser = user => {
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
                fetch(`http://localhost:5000/user/${user.email}`, {
                    method: 'DELETE',
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => {
                        if (res.status === 403) {
                            mySwal.fire({
                                title: 'Error',
                                text: 'You are not authorized to delete this user',
                                icon: 'error'
                            })
                        }
                        return res.json()
                    })
                    .then(data => {
                        mySwal.fire({
                            title: 'Success',
                            text: 'User deleted',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                        refetch()
                    })
            }
        })
    }

    if (isLoading) return <Loading/>;

    return (
        <div>
            <h2 className='text-center p_color mb-3'>Manage Users</h2>
            <Table striped responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td>
                                {user.role !== 'admin' &&
                                <button className={'btn btn-primary btn-sm'}
                                        onClick={() => makeAdmin(user)}>Make Admin</button>}
                                {user.role === 'admin' &&
                                <button className={'btn btn-primary btn-sm'}
                                        onClick={() => removeAdmin(user)}>Remove Admin</button>}
                                <button className={'btn btn-danger btn-sm ms-3'} onClick={() => deleteUser(user)}>Delete</button>
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