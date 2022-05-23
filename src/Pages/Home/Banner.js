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
                            <h4 className="">Supplying the world with high quality chemical products.</h4>
                            <Link to='/manage-inventories' className='btn-default-2'>Buy Now</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Banner;