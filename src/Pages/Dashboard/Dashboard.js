import React from 'react';
import logo from '../../logo.png';
import {FaHome} from "@react-icons/all-files/fa/FaHome";
import {Link, Outlet} from "react-router-dom";
import {AiFillDashboard} from "@react-icons/all-files/ai/AiFillDashboard";
import CustomLink from "../Common/CustomLink";
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";

const Dashboard = () => {
    return (
        <>
            <div className="dashboard-main d-flex">
                <div className="d-flex flex-column flex-shrink-0 p-3 bg-light vh-100" style={{width: '280px'}}>
                    <Link to="/" className="mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                        <img src={logo} alt="logo"/>
                    </Link>
                    <hr/>
                    <ul className="nav nav-pills flex-column mb-auto ms-0">
                        <li>
                            <CustomLink to='/dashboard'>
                                Dashboard
                            </CustomLink>
                        </li>
                        <li>
                            <CustomLink to='/dashboard/my-orders'>
                                My Orders
                            </CustomLink>
                        </li>
                        <li>
                            <CustomLink to='/dashboard/add-review'>
                                Add a review
                            </CustomLink>
                        </li>
                        <li>
                            <CustomLink to='/dashboard/my-profile'>
                                My Profile
                            </CustomLink>
                        </li>
                    </ul>
                    <hr/>
                    <div className="dropdown">
                        <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                           id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="" width="32" height="32"
                                 className="rounded-circle me-2"/>
                            <strong>mdo</strong>
                        </a>
                        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                            <li><a className="dropdown-item" href="#">New project...</a></li>
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li><a className="dropdown-item" href="#">Profile</a></li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li><a className="dropdown-item" href="#">Sign out</a></li>
                        </ul>
                    </div>
                </div>
                <div className={'dashboard-content w-100'}>
                    <header className="py-3 mb-3 border-bottom w-100">
                        <div className="container-fluid d-grid gap-3 align-items-center">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-1 dropdown ">
                                    <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle"
                                       id="dropdownUser2"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32"
                                             className="rounded-circle"/>
                                    </a>
                                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                                        <li><a className="dropdown-item" href="#">New project...</a></li>
                                        <li><a className="dropdown-item" href="#">Settings</a></li>
                                        <li><a className="dropdown-item" href="#">Profile</a></li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </header>
                    <Outlet/>
                </div>
            </div>
        </>
    );
};

export default Dashboard;