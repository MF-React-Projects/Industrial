import React, {useEffect, useState} from 'react';
import loginThumb from '../../assets/img/login.jpg';
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useCreateUserWithEmailAndPassword, useUpdateProfile} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import {useForm} from "react-hook-form";
import SocialLogin from "./SocialLogin";
import useToken from "../../hooks/useToken";

const Register = () => {
    const [agree, setAgree] = useState(false);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, {sendEmailVerification: true});
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const {register, formState: {errors}, handleSubmit} = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const [token] = useToken(user);

    useEffect(() => {
        if(token){
            navigate(from, { replace: true });
        }
    }, [token, from, navigate])

    // Error handling
    let registerError, errorMessage;
    if(error || updateError){
        switch (error?.code || updateError?.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'Email already in use';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password is too weak';
                break;
            default:
                errorMessage = error?.message || updateError?.message;
                break;
        }
        registerError = <small className='text-danger'>{errorMessage}</small>
    }

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({displayName: data.name});
    }
    return (
        <>
            <Header/>
            <section className="ic-login-area">
                <div className="ic-page-title text-center ic-login-title">
                    <h2>Register</h2>
                </div>
                <Container>
                    <div className="ic-login-content">
                        <div className="ic-registration-box">
                            <Row>
                                <Col md={6}>
                                    <div className="ic-registration-image">
                                        <img src={loginThumb} className="img-fluid" alt=""/>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="ic-login-field">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-group mb-3">
                                                <label className="form-label">Your Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Your Name"
                                                    className="form-control"
                                                    {...register("name", {
                                                        required: {
                                                            value: true,
                                                            message: 'Name is Required'
                                                        }
                                                    })}
                                                />
                                                <small className="text-danger">
                                                    {errors.name?.type === 'required' && errors.name.message}
                                                </small>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-label">Email Address</label>
                                                <input
                                                    type="email"
                                                    placeholder="Your Email"
                                                    className="form-control"
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
                                                />
                                                <small className="text-danger">
                                                    {errors.email?.type === 'required' && errors.email.message}
                                                    {errors.email?.type === 'pattern' && errors.email.message}
                                                </small>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    placeholder="Password"
                                                    className="form-control"
                                                    {...register("password", {
                                                        required: {
                                                            value: true,
                                                            message: 'Password is Required'
                                                        },
                                                        minLength: {
                                                            value: 6,
                                                            message: 'Must be 6 characters or longer'
                                                        }
                                                    })}
                                                />
                                                <small className="text-danger">
                                                    {errors.password?.type === 'required' && errors.password.message}
                                                    {errors.password?.type === 'minLength' && errors.password.message}
                                                </small>
                                            </div>
                                            {registerError}
                                            <div className="form-check mb-3">
                                                <input className="form-check-input" type="checkbox"
                                                       onChange={() => setAgree(!agree)} id="flexCheckDefault"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    I agree to the Terms and Conditions
                                                </label>
                                            </div>
                                            {
                                                (loading || updating) ?
                                                    <button className='btn-default w-100 mb-3' type="submit"
                                                            disabled={!agree}>Register
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                            className='ms-2'
                                                        />
                                                    </button>
                                                    :
                                                    <button className='btn-default w-100 mb-3' type="submit"
                                                            disabled={!agree}>Register</button>
                                            }

                                            <p>Already Have An Account? <Link to={'/login'}
                                                                              className='text-decoration-underline'>Login
                                                Now</Link></p>
                                        </form>
                                        <SocialLogin/>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Container>
            </section>
            <Footer/>
        </>
    );
};

export default Register;