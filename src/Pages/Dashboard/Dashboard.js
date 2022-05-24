import React from 'react';
import {FaHome} from "@react-icons/all-files/fa/FaHome";

const Dashboard = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light vh-100" style={{width: '280px'}}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <span className="fs-4">Sidebar</span>
            </a>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto ms-0">
                <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="page">
                        <FaHome/>
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-dark">
                        <svg className="bi pe-none me-2" width="16" height="16">

                        </svg>
                        Dashboard
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-dark">
                        <svg className="bi pe-none me-2" width="16" height="16">

                        </svg>
                        Orders
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-dark">
                        <svg className="bi pe-none me-2" width="16" height="16">

                        </svg>
                        Products
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-dark">
                        <svg className="bi pe-none me-2" width="16" height="16">

                        </svg>
                        Customers
                    </a>
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
    );
};

export default Dashboard;