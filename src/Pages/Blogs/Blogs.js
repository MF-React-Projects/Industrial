import React from 'react';
import {Container, Row} from "react-bootstrap";
import SectionHeader from "../Common/SectionHeader";
import Blog from "../Home/Blog";
import {useQuery} from "react-query";
import Loading from "../Common/Loading";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const Blogs = () => {
    const {
        data: blogs,
        isLoading
    } = useQuery('blogs', () => fetch('https://immense-savannah-85373.herokuapp.com/blogs').then(res => res.json()));
    if (isLoading) return <Loading/>

    return (
        <>
            <Header/>
            <div className='blog-section py-80'>
                <Container>
                    <SectionHeader badge={'News Feeds'} title={'Latest News'}/>
                    <Row className='mb-3'>
                        {
                            blogs.map(blog => <Blog key={blog._id} blog={blog}/>)
                        }
                    </Row>
                </Container>
            </div>
            <Footer/>
        </>
    );
};

export default Blogs;