import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register";
import Purchase from "./Pages/Purchase/Purchase";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/" element={
                    <Purchase/>
                }/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </>
    );
}

export default App;
