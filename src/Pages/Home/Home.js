import React from 'react';
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Banner from "./Banner";
import Products from "./Products";

const Home = () => {
    return (
        <>
            <Header/>
            <Banner/>
            <Products/>
            <Footer/>
        </>
    );
};

export default Home;