import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register";
import Purchase from "./Pages/Purchase/Purchase";
import RequireAuth from "./Pages/Login/RequireAuth";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyOrders from "./Pages/Dashboard/MyOrders";
import AddReview from "./Pages/Dashboard/AddReview";
import MyProfile from "./Pages/Dashboard/MyProfile";
import Payment from "./Pages/Dashboard/Payment";
import ManageUsers from "./Pages/Dashboard/ManageUsers";
import AddProduct from "./Pages/Dashboard/AddProduct";
import ManageProducts from "./Pages/Dashboard/ManageProducts";
import RequireAdmin from "./Pages/Login/RequireAdmin";
import EditProduct from "./Pages/Dashboard/EditProduct";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/product/:id" element={
                    <RequireAuth><Purchase/></RequireAuth>
                }/>
                <Route path='dashboard' element={
                    <RequireAuth>
                        <Dashboard/>
                    </RequireAuth>
                }>
                    <Route index element={<MyOrders/>}/>
                    <Route path={'my-orders'} element={<MyOrders/>}/>
                    <Route path={'payment/:id'} element={<Payment/>}/>
                    <Route path={'add-review'} element={<AddReview/>}/>
                    <Route path={'my-profile'} element={<MyProfile/>}/>
                    <Route path={'manage-users'} element={<RequireAdmin><ManageUsers/></RequireAdmin>}/>
                    <Route path={'add-product'} element={<RequireAdmin><AddProduct/></RequireAdmin>}/>
                    <Route path={'edit-product'} element={<RequireAdmin><EditProduct/></RequireAdmin>}/>
                    <Route path={'manage-products'} element={<RequireAdmin><ManageProducts/></RequireAdmin>}/>
                </Route>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </>
    );
}

export default App;
