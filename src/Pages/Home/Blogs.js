import React from 'react';
import {Container, Row} from "react-bootstrap";
import SectionHeader from "../Common/SectionHeader";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import Blog from "./Blog";
import Loading from "../Common/Loading";

const Blogs = () => {
    const navigate = useNavigate();
    const {data: blogs, isLoading} = useQuery('blogs', () => fetch('http://localhost:5000/blogs?limit=3').then(res => res.json()));
    console.log(blogs)
    if(isLoading) return <Loading/>

    return (
        <section id="blog" className="home-blog-section">
            <Container>
                <SectionHeader badge={'News Feeds'} title={'Latest News'}/>
                <Row className='mb-5'>
                    {
                        blogs.map(blog => <Blog key={blog._id} blog={blog}/>)
                    }
                </Row>
                <div className="text-center mt-4">
                    <button onClick={() => navigate('/blogs')} className="btn-default">View All Blog</button>
                </div>
            </Container>
        </section>
    );
};

export default Blogs;