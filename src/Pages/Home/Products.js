import React from 'react';
import {Container, Row} from "react-bootstrap";
import {useQuery} from "react-query";
import Loading from "../Common/Loading";
import Product from "./Product";
import SectionHeader from "../Common/SectionHeader";

const Products = () => {
    const {
        data: products,
        isLoading
    } = useQuery('products', () => fetch('http://localhost:5000/products?limit=8', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading/>
    }

    return (
        <section className="products-section py-80" id={'products'}>
            <Container>
                <SectionHeader badge={'New Arival'} title={'Our Latest Production'}/>
                <Row>
                    {
                        products.map(product => <Product key={product._id} product={product}/>)
                    }
                </Row>
            </Container>
        </section>
    );
};

export default Products;