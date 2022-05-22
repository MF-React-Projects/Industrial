import React from 'react';
import logo from '../../logo.png';
import loginThumb from '../../assets/img/login.jpg';
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import {Col, Container, Row} from "react-bootstrap";

const Login = () => {
    return (
        <>
            <Header/>
            <section className="ic-login-area">
                <div className="ic-page-title text-center ic-login-title">
                    <h2>Account</h2>
                    <p><a href="#">Account</a> <span>//</span><a href="login.html"> Login</a></p>
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
                                        <div className="ic-login-field">
                                            <input type="text" name="name" className="form-control" placeholder="Enter Email or User Name"/>
                                            <input type="password" name="password" className="form-control" placeholder="Password"/>
                                        </div>
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