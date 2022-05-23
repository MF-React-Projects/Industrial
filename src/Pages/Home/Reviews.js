import React from 'react';
import {Link} from "react-router-dom";
import {Container, Row} from "react-bootstrap";
import {useQuery} from "react-query";
import ReviewItem from "./ReviewItem";
import Loading from "../Common/Loading";
import SectionHeader from "../Common/SectionHeader";

const Reviews = () => {
    const {data: reviews, isLoading, isError} = useQuery('reviews', () => {
        return fetch('http://localhost:5000/reviews?limit=3')
            .then(res => res.json())
    });

    if(isLoading) return <Loading/>

    return (
        <section className="testimonial-section section-bg py-80">
            <Container>
                <SectionHeader badge={'Best Reviews'} title={'Customer Reviews'}/>
                <div className="review-items">
                    <Row>
                        {
                            reviews.map(review => <ReviewItem key={review.id} review={review}/>)
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