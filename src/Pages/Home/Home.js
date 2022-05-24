import React from 'react';
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Banner from "./Banner";
import Products from "./Products";
import Reviews from "./Reviews";
import Blogs from "./Blogs";

const Home = () => {
    return (
        <>
            <Header/>
            <Banner/>
            <Products/>
            <Reviews/>
            <Blogs/>
            <Footer/>
        </>
    );
};

export default Home;