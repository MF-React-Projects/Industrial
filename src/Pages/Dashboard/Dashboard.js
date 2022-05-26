import React from 'react';
import logo from '../../logo.png';
import favicon from '../../assets/img/favicon.png';
import {Link, Outlet} from "react-router-dom";
import CustomLink from "../Common/CustomLink";
import {useAuthState} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import {FaUserAlt} from "@react-icons/all-files/fa/FaUserAlt";
import {Dropdown, NavDropdown} from "react-bootstrap";
import {signOut} from "firebase/auth";
import {IoIosSpeedometer} from "@react-icons/all-files/io/IoIosSpeedometer";
import {IoSpeedometerOutline} from "@react-icons/all-files/io5/IoSpeedometerOutline";
import {BsTable} from "@react-icons/all-files/bs/BsTable";
import {AiOutlineUser} from "@react-icons/all-files/ai/AiOutlineUser";
import {AiFillStar} from "@react-icons/all-files/ai/AiFillStar";
import {AiOutlineUsergroupAdd} from "@react-icons/all-files/ai/AiOutlineUsergroupAdd";
import {AiOutlineAppstoreAdd} from "@react-icons/all-files/ai/AiOutlineAppstoreAdd";
import {FiGrid} from "@react-icons/all-files/fi/FiGrid";

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user)
    const handleSignOut = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    };
    return (
        <>
            <div className="dashboard-main d-flex">
                <div className="d-flex flex-column flex-shrink-0 p-3 bg-light vh-100 desktop-sidebar" style={{width: '280px'}}>
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
                <div className="d-flex flex-column flex-shrink-0 bg-light vh-100 mobile-sidebar" style={{width: '4.5rem'}}>
                    <a href="/" className="d-block p-3 link-dark text-decoration-none" title="Icon-only"
                       data-bs-toggle="tooltip" data-bs-placement="right">
                        <img src={favicon} alt="" width={25}/>
                    </a>
                    <ul className="nav nav-pills nav-flush flex-column mb-auto text-center m-0">
                        <li className="nav-item">
                            <CustomLink to='/dashboard' className="nav-link py-3 border-bottom" title="Dashboard" data-bs-toggle="tooltip" data-bs-placement="right">
                                <IoSpeedometerOutline/>
                            </CustomLink>
                        </li>
                        <li className="nav-item">
                            <CustomLink to='/dashboard/my-orders' className="nav-link py-3 border-bottom" title="My Orders" data-bs-toggle="tooltip" data-bs-placement="right">
                                <BsTable/>
                            </CustomLink>
                        </li>
                        <li className="nav-item">
                            <CustomLink to='/dashboard/add-review' className="nav-link py-3 border-bottom" title="Add Review" data-bs-toggle="tooltip" data-bs-placement="right">
                                <AiFillStar/>
                            </CustomLink>
                        </li>
                        <li className="nav-item">
                            <CustomLink to='/dashboard/my-profile' className="nav-link py-3 border-bottom" title="My Profile" data-bs-toggle="tooltip" data-bs-placement="right">
                                <AiOutlineUser/>
                            </CustomLink>
                        </li>
                        {admin && <>
                            <li className="nav-item">
                                <CustomLink to='/dashboard/manage-orders' className="nav-link py-3 border-bottom" title="Manage All Orders" data-bs-toggle="tooltip" data-bs-placement="right">
                                    <BsTable/>
                                </CustomLink>
                            </li>
                            <li className="nav-item">
                                <CustomLink to='/dashboard/manage-users' className="nav-link py-3 border-bottom" title="Manage All Users" data-bs-toggle="tooltip" data-bs-placement="right">
                                    <AiOutlineUsergroupAdd/>
                                </CustomLink>
                            </li>
                            <li className="nav-item">
                                <CustomLink to='/dashboard/add-product' className="nav-link py-3 border-bottom" title="Add Product" data-bs-toggle="tooltip" data-bs-placement="right">
                                    <AiOutlineAppstoreAdd/>
                                </CustomLink>
                            </li>
                            <li className="nav-item">
                                <CustomLink to='/dashboard/manage-products' className="nav-link py-3 border-bottom" title="Manage Products" data-bs-toggle="tooltip" data-bs-placement="right">
                                    <FiGrid/>
                                </CustomLink>
                            </li>
                        </>
                        }


                    </ul>
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