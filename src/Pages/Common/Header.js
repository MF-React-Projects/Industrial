import React from 'react';
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import logo from '../../logo.png';
import {Link} from "react-router-dom";
import CustomLink from "./CustomLink";

const Header = () => {
    return (
        <>
            <header className="header-area">
                <div className="top-bar">
                    <Container>
                        <Row>
                            <Col lg='6'>
                                <div className="top-bar-left">
                                    <div id="anpstext-7" className="widget widget_anpstext">
                                        <ul className="contact-info">
                                            <li className="contact-info-item"><i className="fa fa-map-marker"></i>300 Pennsylvania Ave NW</li>
                                            <li className="contact-info-item"><i className="fa fa-clock-o"></i>Mon - Sat: 7:00 - 17:00</li>
                                            <li className="contact-info-item"><i className="fa fa-phone"></i>+ 386 40 111 5555</li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            <Col lg='6'>
                                <div className="top-bar-right">
                                    <div id="anpstext-8" className="widget widget_anpstext">
                                        <ul className="contact-info">
                                            <li className="contact-info-item"><i className="fa fa-envelope-o"></i> info@yourdomain.com</li>
                                        </ul>
                                    </div>
                                    <div id="anpssocial-2" className="widget widget_anpssocial">
                                        <ul className="social">
                                            <li><a href="#" target="_self"><i className="fa fa-twitter"></i></a></li>
                                            <li><a href="#" target="_self"><i className="fa fa-facebook"></i></a></li>
                                            <li><a href="#" target="_self"><i className="fa fa-linkedin"></i></a></li>
                                            <li><a href="#" target="_self"><i className="fa fa-wordpress"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Navbar collapseOnSelect expand="lg" variant="light" className={'py-3'}>
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            <img src={logo} className="img-fluid" alt="logo"/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="m-auto">
                                <CustomLink to="/">Home</CustomLink>
                                <CustomLink to="/blogs">Blogs</CustomLink>
                            </Nav>
                            <div className="pm-header-right">

                            </div>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default Header;