import React from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";
import {Col, Row} from "react-bootstrap";
import {useQuery} from "react-query";
import Loading from "../Common/Loading";

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const {data: userData, isLoading} = useQuery(["user", user.email], () => {
        return axios.get(`https://immense-savannah-85373.herokuapp.com/user/${user.email}`, {
            headers: {
                "Content-Type": "application/json",
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => {
            reset({
                name: user.displayName,
                email: user.email,
                phone: res.data?.phone,
                address: res.data?.address,
                city: res.data?.city,
                state: res.data?.state,
                zip: res.data?.zip,
                education: res.data?.education,
                fbLink: res.data?.fbLink,
                twitterLink: res.data?.twitterLink,
                linkedinLink: res.data?.linkedinLink,
            })
        });
    });
    const {register, formState: {errors}, handleSubmit, reset} = useForm({
        defaultValues: {
            name: user.displayName,
            email: user.email,
            phone: userData?.phone,
            address: userData?.address,
            city: userData?.city,
            state: userData?.state,
            zip: userData?.zip,
            education: userData?.education,
            fbLink: userData?.fbLink,
            twitterLink: userData?.twitterLink,
            linkedinLink: userData?.linkedinLink,
        }
    });
    const mySwal = withReactContent(Swal);

    const onSubmit = async data => {
        const userData = {
            ...data
        }
        //insert data to database
        try {
            const response = await axios.put(`https://immense-savannah-85373.herokuapp.com/user/${user.email}`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            mySwal.fire({
                title: 'Success',
                text: 'Your profile has been updated',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        } catch (e) {
            mySwal.fire({
                title: 'Error',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    };

    if (isLoading) return <Loading/>

    return (
        <div>
            <h2 className='text-center p_color mb-3'>My Profile</h2>
            <form className={'row g-3'} onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder='Enter your name'
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })}
                        readOnly
                    />
                    <small className="text-danger">
                        {errors.name?.type === 'required' && errors.name.message}
                    </small>
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder='Enter your email'
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is Required'
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Provide a valid Email'
                            }
                        })}
                        readOnly
                    />
                    <small className="text-danger">
                        {errors.email?.type === 'required' && errors.email.message}
                        {errors.email?.type === 'pattern' && errors.email.message}
                    </small>
                </div>
                <div className="col-md-12">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder='Enter your phone'
                        {...register("phone", {
                            required: {
                                value: true,
                                message: 'Phone is Required'
                            }
                        })}
                    />
                    <small className="text-danger">
                        {errors.phone?.type === 'required' && errors.phone.message}
                    </small>
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="Enter your address"
                        {...register("address", {
                            required: {
                                value: true,
                                message: 'Address is Required'
                            }
                        })}
                    />
                    <small className="text-danger">
                        {errors.address?.type === 'required' && errors.address.message}
                    </small>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputCity" className="form-label">City</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputCity"
                        {...register("city")}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">State</label>
                    <input type="text" className="form-control"
                           id="inputState" {...register("state")}/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="inputZip" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="inputZip" {...register("zip")}/>
                </div>
                <div className="col-12">
                    <label className="form-label">Education</label>
                    <textarea
                        placeholder="Enter your education"
                        className="form-control"
                        {...register("education")}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Facebook profile link</label>
                    <input
                        type='text'
                        placeholder="Enter your facebook profile link"
                        className="form-control"
                        {...register("fbLink")}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Twitter profile link</label>
                    <input
                        type='text'
                        placeholder="Enter your twitter profile link"
                        className="form-control"
                        {...register("twitterLink")}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Linkedin profile link</label>
                    <input
                        type='text'
                        placeholder="Enter your linkedin profile link"
                        className="form-control"
                        {...register("linkedinLink")}
                    />
                </div>
                <div className="col-12">
                    <button className='btn-default mb-3' type="submit">Update Profile</button>
                </div>
            </form>
        </div>
    );
};

export default MyProfile;