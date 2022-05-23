import React from 'react';
import {Container, Row} from "react-bootstrap";
import SectionHeader from "../Common/SectionHeader";
import {useNavigate} from "react-router-dom";

const Blogs = () => {
    const navigate = useNavigate();
    return (
        <section id="blog" className="home-blog-section">
            <Container>
                <SectionHeader badge={'News Feeds'} title={'Latest News'}/>
                <Row className='mb-5'>
                    {
                        blogs.map(blog => <Blog key={blog.id} blog={blog}/>)
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