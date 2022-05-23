import React from 'react';
import {Button, Col} from "react-bootstrap";
import {FaCartPlus} from "@react-icons/all-files/fa/FaCartPlus";

const Product = ({product}) => {
    const {name, price, image} = product;

    return (
        <Col xs={12} sm={6} md={6} lg={4}>
            <div className="flick-product">
                <div className="img-box">
                    <img src={image} alt="" className='img-fluid'/>
                </div>
                <div className="flick-product-content">
                    <h5>{name}</h5>
                    <p>${price}</p>
                    <Button variant="primary" className='w-100'>
                        Add to cart
                        <FaCartPlus/>
                    </Button>
                </div>
            </div>
        </Col>
    );
};

export default Product;