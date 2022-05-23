import React from 'react';
import {Link} from "react-router-dom";
import {Container, Row} from "react-bootstrap";
import {useQuery} from "react-query";

const Reviews = () => {
    return (
        <section className="testimonial-section">
            <Container>

                <div className="review-items">
                    <Row>
                        {

                        }
                    </Row>
                </div>
                <div className="view-all-reviews text-center mt-5">
                    <Link to="/reviews" className={'btn-default'}>View All Reviews</Link>
                </div>
            </Container>
        </section>
    );
};

export default Reviews;