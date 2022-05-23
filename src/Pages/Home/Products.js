import React from 'react';
import {Container, Row} from "react-bootstrap";
import {useQuery} from "react-query";
import Loading from "../Common/Loading";
import Product from "./Product";

const Products = () => {
    const {data: products, isLoading} = useQuery('products', () => fetch('http://localhost:5000/products?limit=6').then(res => res.json()));

    if(isLoading) {
        return <Loading/>
    }

    return (
        <section className="products-section">
            <Container>
                <div className="section-header text-center">
                    <h6 className="badge">Our Best Products</h6>
                    <h3 className="section-title font-36">Check our Products</h3>
                </div>
                <div className="ic-products">
                    <div className="ic-grid-products">
                        <Row>
                            {
                                products.map(product => <Product key={product._id} product={product}/>)
                            }
                        </Row>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Products;