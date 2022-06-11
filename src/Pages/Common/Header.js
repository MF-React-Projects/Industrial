import React from 'react';
import {Col, Container, Nav, Navbar, Row, NavDropdown, Dropdown} from "react-bootstrap";
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
import {FaUserAlt} from "@react-icons/all-files/fa/FaUserAlt";

const Header = () => {
    const [user] = useAuthState(auth);
    const handleSignOut = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    };
    return (
        <>
            <header className="header-area">
                <div className="top-bar">
                    <Container>
                        <Row>
                            <Col lg='8'>
                                <ul className="contact-info ms-0">
                                    <li className="contact-info-item ps-0"><FaMapMarkerAlt/> 300 Pennsylvania Ave NW
                                    </li>
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
                            <Nav className="m-auto">
                                <CustomLink to="/">Home</CustomLink>
                                <CustomLink to="/blogs">Blogs</CustomLink>
                                {user && <CustomLink to="/dashboard">Dashboard</CustomLink>}
                                <CustomLink to="/my-portfolio">My Portfolio</CustomLink>
                            </Nav>
                            {
                                user ?
                                    <>
                                        <Nav pullRight>
                                            <NavDropdown eventKey={1}
                                                         title={
                                                             <div className="pull-left">
                                                                 {
                                                                     user?.photoURL ?
                                                                         <img src={user?.photoURL}
                                                                              alt="user-profile-pic"
                                                                              className={'rounded-circle me-2'}
                                                                              width='50'/>
                                                                         :
                                                                         <FaUserAlt className={'me-2'}/>
                                                                 }
                                                                 <strong>{user?.displayName}</strong>
                                                             </div>
                                                         }
                                                         id="basic-nav-dropdown">
                                                <Dropdown.Item eventKey="1" to='/dashboard'
                                                               as={Link}>Dashboard</Dropdown.Item>
                                                <Dropdown.Item eventKey="2" to='/dashboard/my-profile' as={Link}>My
                                                    Profile</Dropdown.Item>
                                                <Dropdown.Divider/>
                                                <Dropdown.Item eventKey="4"
                                                               onClick={handleSignOut}>Logout</Dropdown.Item>
                                            </NavDropdown>
                                        </Nav>
                                    </> :
                                    <>
                                        <Link to={'/login'} className='btn-default btnSm'>Login</Link>
                                        <Link to={'/register'}
                                              className='btn-default btn-secondary ms-3 btnSm'>Register</Link>
                                    </>
                            }

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default Header;