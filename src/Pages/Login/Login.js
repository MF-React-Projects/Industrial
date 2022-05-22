import React, {useEffect} from 'react';
import loginThumb from '../../assets/img/login.jpg';
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import {Button, Col, Container, Row, Spinner} from "react-bootstrap";
import {useSendPasswordResetEmail, useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {useForm} from "react-hook-form";
import {Link, useLocation, useNavigate} from "react-router-dom";
import auth from "../../firebase.init";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SocialLogin from "./SocialLogin";

const Login = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
    const {register, formState: {errors}, handleSubmit} = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    //sweetalert
    const mySwal = withReactContent(Swal);

    useEffect(() => {
        if (user) {
            navigate(from, {replace: true});
        }
    }, [user, from, navigate])

    // Error handling
    let loginError, errorMessage;
    if(error) {
        switch (error?.code) {
            case 'auth/user-not-found':
                errorMessage = 'User not found';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Wrong password';
                break;
            case 'auth/missing-email':
                errorMessage = 'User not found with this email';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email';
                break;
            default:
                errorMessage = error?.message;
                break;
        }
        loginError = <small className='text-danger'>{errorMessage}</small>
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
    }

    const resetPassword = async event => {
        console.log(register)
        const email = '';
        if (email) {
            await sendPasswordResetEmail(email);
            mySwal.fire({
                title: 'Email sent',
                text: 'Check your email to reset your password',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        } else {
            mySwal.fire({
                title: 'Email required',
                text: 'Please enter your email',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }
    return (
        <>
            <Header/>
            <section className="ic-login-area">
                <div className="ic-page-title text-center ic-login-title">
                    <h2>Login</h2>
                </div>
                <Container>
                    <div className="ic-login-content">
                        <div className="ic-registration-box">
                            <Row className={'align-items-center'}>
                                <Col lg={'6'}>
                                    <div className="ic-registration-image">
                                        <img src={loginThumb} className="img-fluid" alt=""/>
                                    </div>
                                </Col>
                                <Col lg={'6'}>
                                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                        {loginError}
                                        {
                                            (loading) ?
                                                <Button className='btn-default w-100' type="submit">Login
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        className='ms-2'
                                                    />
                                                </Button>
                                                :
                                                <Button className='btn-default w-100' type="submit">Login</Button>
                                        }

                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <p>Don't Have An Account? <Link className='text-decoration-underline'
                                                                            to="/register">Register
                                                Now</Link></p>
                                            <Button variant='link' className="p-0 mb-2" onClick={resetPassword}>Forgot
                                                Password?</Button>
                                        </div>
                                    </form>
                                    <SocialLogin/>
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

export default Login;