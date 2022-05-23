import React from 'react';
import {Link} from "react-router-dom";
import {Container, Row} from "react-bootstrap";
import {useQuery} from "react-query";
import ReviewItem from "./ReviewItem";
import Loading from "../Common/Loading";

const Reviews = () => {
    const {data: reviews, isLoading, isError} = useQuery('reviews', () => {
        return fetch('https://localhost:5000/reviews')
            .then(res => res.json())
    });

    if(isLoading) return <Loading/>

    return (
        <section className="testimonial-section">
            <Container>

                <div className="review-items">
                    <Row>
                        {
                            reviews.slice(0, 3).map(review => <ReviewItem key={review.id} review={review}/>)
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