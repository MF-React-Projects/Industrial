import React from 'react';
import {Link, useParams} from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import {Col, Container, Row} from "react-bootstrap";

const Purchase = () => {
    const {id} = useParams();
    return (
        <>
            <Header/>
            <div className='product-details'>
                <Container>
                    <Row>
                        <Col lg={3}>
                            <div className="product-single-thumb">
                                <img src={image} alt="product-thumb" className='img-fluid'/>
                            </div>
                        </Col>
                        <Col lg={9}>
                            <div className="product-single-content">
                                <h2>{name}</h2>
                                <ul className='product-infos list-unstyled ps-0 ms-0 mb-3 d-flex align-items-center justify-content-between'>
                                    <li><b>Price:</b> ${price}</li>
                                    <li><b>Quantity:</b> {quantity}</li>
                                    <li><b>Supplier:</b> {supplier}</li>
                                </ul>
                                <p>{description}</p>
                                <div className="d-flex align-items-center mt-4">
                                    <Button className='btn-default btn-secondary btnSm me-3' onClick={handleDeliver}>Delivered</Button>
                                    <Link to='/manage-inventories' className='btn-default btnSm'>Manage Inventories</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer/>
        </>
    );
};

export default Purchase;