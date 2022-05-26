import React from 'react';
import logo from '../../logo.png';
import {Link, Outlet} from "react-router-dom";
import CustomLink from "../Common/CustomLink";
import {useAuthState} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import {FaUserAlt} from "@react-icons/all-files/fa/FaUserAlt";
import {Dropdown, NavDropdown} from "react-bootstrap";
import {signOut} from "firebase/auth";

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user)
    const handleSignOut = () => {
        signOut(auth);
    };
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

                        {admin && <>
                            <li>
                                <CustomLink to='/dashboard/manage-orders'>
                                    Manage All Orders
                                </CustomLink>
                            </li>
                            <li>
                                <CustomLink to='/dashboard/manage-users'>
                                    Manage All Users
                                </CustomLink>
                            </li>
                            <li>
                                <CustomLink to='/dashboard/add-product'>
                                    Add Product
                                </CustomLink>
                            </li>
                            <li>
                                <CustomLink to='/dashboard/manage-products'>
                                    Manage Products
                                </CustomLink>
                            </li>
                        </>
                        }
                    </ul>
                    <hr/>
                    <NavDropdown eventKey={1}
                                 title={
                                     <div className="pull-left">
                                         {
                                             user?.photoURL?
                                                 <img src={user?.photoURL} alt="user-profile-pic"
                                                      className={'rounded-circle me-2'} width='50'/>
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
                </div>
                <div className={'dashboard-content px-5 py-5 w-100'}>
                    <Outlet/>
                </div>
            </div>
        </>
    );
};

export default Dashboard;