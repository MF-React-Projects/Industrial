import React from 'react';
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import logo from '../../logo.png';
import {Link} from "react-router-dom";
import CustomLink from "./CustomLink";
import {FaFacebookF} from "@react-icons/all-files/fa/FaFacebookF";
import {FaTwitter} from "@react-icons/all-files/fa/FaTwitter";
import {FaLinkedin} from "@react-icons/all-files/fa/FaLinkedin";
import {FaInstagram} from "@react-icons/all-files/fa/FaInstagram";
import {FaPinterestP} from "@react-icons/all-files/fa/FaPinterestP";
import {FaPhoneAlt} from "@react-icons/all-files/fa/FaPhoneAlt";
import {FaRegEnvelope} from "@react-icons/all-files/fa/FaRegEnvelope";
import {FaMapMarkerAlt} from "@react-icons/all-files/fa/FaMapMarkerAlt";
import {useAuthState} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import {signOut} from 'firebase/auth';

const Header = () => {
    const [user] = useAuthState(auth);

    const handleSignOut = () => {
        signOut(auth);
    };
    return (
        <>
            <header className="header-area">
                <div className="top-bar">
                    <Container>
                        <Row>
                            <Col lg='8'>
                                <ul className="contact-info ms-0">
                                    <li className="contact-info-item ps-0"><FaMapMarkerAlt/> 300 Pennsylvania Ave NW</li>
                                    <li className="contact-info-item"><FaRegEnvelope/> info@yourdomain.com</li>
                                    <li className="contact-info-item"><FaPhoneAlt/> + 386 40 111 5555</li>
                                </ul>
                            </Col>
                            <Col lg='4'>
                                <ul className="social">
                                    <li><Link to='#' target="_self"><FaFacebookF/></Link></li>
                                    <li><Link to='#' target="_self"><FaTwitter/></Link></li>
                                    <li><Link to='#' target="_self"><FaLinkedin/></Link></li>
                                    <li><Link to='#' target="_self"><FaInstagram/></Link></li>
                                    <li><Link to='#' target="_self"><FaPinterestP/></Link></li>
                                </ul>
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
                            <Nav className="ms-auto">
                                <CustomLink to="/">Home</CustomLink>
                                <CustomLink to="/blogs">Blogs</CustomLink>
                            </Nav>
                            <div className="header-right">
                                {
                                    user ?
                                        <button className='btn-default btnSm' onClick={handleSignOut}>Logout</button>
                                        :
                                        <>
                                            <Link to={'/login'} className='btn-default btnSm'>Login</Link>
                                            <Link to={'/register'}
                                                  className='btn-default btn-secondary ms-3 btnSm'>Register</Link>
                                        </>
                                }
                            </div>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default Header;