import React from 'react';
import {Button, Col} from "react-bootstrap";
import {FaCartPlus} from "@react-icons/all-files/fa/FaCartPlus";

const Product = ({product}) => {
    const {name, price, image} = product;

    return (
        <Col xs={12} sm={6} md={6} lg={3}>
            <div className="ic-product">
                <div className="img-box">
                    <img src={image} alt="" className='img-fluid'/>
                </div>
                <div className="ic-product-content">
                    <h5>{name}</h5>
                    <p className={'price'}>${price}</p>
                    <Button className='w-100 btn-default btn-sm'>
                        <FaCartPlus className={'me-2'}/>
                        Add to cart
                    </Button>
                </div>
            </div>
        </Col>
    );
};

export default Product;