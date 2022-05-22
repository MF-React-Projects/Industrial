import React, {useEffect} from 'react';
import loginThumb from '../../assets/img/login.jpg';
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import {Col, Container, Row} from "react-bootstrap";
import {useSignInWithEmailAndPassword, useSignInWithGoogle} from "react-firebase-hooks/auth";
import {useForm} from "react-hook-form";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Loading from "../Common/Loading";
import auth from "../../firebase.init";

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const {register, formState: {errors}, handleSubmit} = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (user || gUser) {
            navigate(from, {replace: true});
        }
    }, [user, gUser, from, navigate])

    if (loading || gLoading) {
        return <Loading/>
    }
    let loginError;
    if (error || gError) {
        loginError = <small className='text-danger'>{error?.message || gError?.message}</small>
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
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
                                    <div className="">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-group mb-4">
                                                <label className="label">Email</label>
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
                                            <div className="form-group mb-4">
                                                <label className="label">Password</label>
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
                                            <div className="d-flex justify-content-between m-display">
                                                <div>
                                                    <div className="ic-round-checkbox ic-login-checkbox">
                                                        <input type="checkbox" id="checkbox"/>
                                                        <label htmlFor="checkbox"></label>
                                                        <p>Remember Me</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="ic-forget-text"><a href="forget-password.html"><i>Forgot Password?</i></a></p>
                                                </div>
                                            </div>
                                            <div className="ic-login-bottom text-center">
                                                <button className='btn-default' type="submit">Login</button>
                                                <p>Don't Have An Account? <span><Link className='text-primary' to="/register">Register Now</Link></span></p>
                                            </div>
                                        </form>
                                        <button onClick={() => signInWithGoogle()} className="btn-default">Continue with Google</button>
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

export default Login;