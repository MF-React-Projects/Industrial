import React, {useEffect} from 'react';
import logo from '../../logo.png';
import loginThumb from '../../assets/img/login.jpg';
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import {Col, Container, Row} from "react-bootstrap";
import {useSignInWithEmailAndPassword, useSignInWithGoogle} from "react-firebase-hooks/auth";
import {useForm} from "react-hook-form";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Loading from "../Common/Loading";

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if(user || gUser) {
            navigate(from, { replace: true });
        }
    }, [user, gUser, from, navigate])

    if(loading || gLoading){
        return <Loading/>
    }
    let signInError;
    if(error || gError){
        signInError= <p className='text-red-500'><small>{error?.message || gError?.message }</small></p>
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
                    <div className="ic-login-content text-center">
                        <Row>
                            <div className="col-sm-12">
                                <div className="ic-login-top">
                                    <img src={logo} className="img-fluid" alt="logo"/>
                                    <p>Welcome back! To get started, enter your email address & password below.</p>
                                </div>
                            </div>
                        </Row>

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
                                            <div className="form-control w-full max-w-xs">
                                                <label className="label">
                                                    <span className="label-text">Email</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    placeholder="Your Email"
                                                    className="input input-bordered w-full max-w-xs"
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
                                                <label className="label">
                                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                                </label>
                                            </div>
                                            <div className="form-control w-full max-w-xs">
                                                <label className="label">
                                                    <span className="label-text">Password</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    placeholder="Password"
                                                    className="input input-bordered w-full max-w-xs"
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
                                                <label className="label">
                                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                                </label>
                                            </div>
                                            {signInError}
                                            <input className='btn w-full max-w-xs text-white' type="submit" value="Login" />
                                        </form>
                                        <p><small>New to Doctors Portal <Link className='text-primary' to="/signup">Create New Account</Link></small></p>
                                        <div className="divider">OR</div>
                                        <button onClick={() => signInWithGoogle()} className="btn btn-outline">Continue with Google</button>
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
                                            <button type="btn">Login My Account</button>
                                            <p>Don't Have An Account? <span><a href="registration.html"><i>Register Now</i></a></span></p>
                                        </div>
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