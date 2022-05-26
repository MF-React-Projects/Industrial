import React from 'react';
import banner from '../../assets/img/banner.jpg';
import {Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";

const Banner = () => {
    return (
        <div className="banner-section" style={{backgroundImage: `url(${banner})`}}>
            <Container>
                <Row>
                    <Col lg='8'>
                        <div className="banner-content">
                            <h1 className=""><span>Best Manufecturer</span> in the world</h1>
                            <h4 className="">Supplying the world with high quality products</h4>
                            <a href='#products' className='btn-default-2'>Buy Now</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Banner;