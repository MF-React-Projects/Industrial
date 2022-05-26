import React from 'react';
import {Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useAuthState} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const AddReview = () => {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const mySwal = withReactContent(Swal);

    const onSubmit = async data => {
        const reviewData = {
            ...data,
            name: user.displayName,
            avatar: user.photoURL,
        }
        const response = await axios.post('https://immense-savannah-85373.herokuapp.com/review', reviewData);
        if (response.status === 200) {
            mySwal.fire({
                title: 'Success',
                text: 'Review added successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/')
            })
        } else {
            mySwal.fire({
                title: 'Error',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }

    }
    return (
        <div>
            <h2 className='text-center p_color mb-3'>Add A Review</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group mb-3">
                    <label className="form-label">Your Review</label>
                    <input
                        type="number"
                        placeholder="Enter your review"
                        className="form-control"
                        {...register("stars", {
                            required: {
                                value: true,
                                message: 'Review is Required'
                            },
                            min: {
                                value: 1,
                                message: 'Review must be at least 1'
                            },
                            max: {
                                value: 5,
                                message: 'Review must be at most 5'
                            }
                        })}
                    />
                    <small className="text-danger">
                        {errors.stars?.type === 'required' && errors.stars.message}
                        {errors.stars?.type === 'min' && errors.stars.message}
                        {errors.stars?.type === 'max' && errors.stars.message}
                    </small>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Your Feedback</label>
                    <textarea
                        placeholder="Enter your feedback"
                        className="form-control"
                        {...register("comment", {
                            required: {
                                value: true,
                                message: 'Feedback is Required'
                            },
                        })}
                    />
                    <small className="text-danger">
                        {errors.comment?.type === 'required' && errors.comment.message}
                    </small>
                </div>
                <button className='btn-default mb-3' type="submit">Add a Review</button>
            </form>
        </div>
    );
};

export default AddReview;