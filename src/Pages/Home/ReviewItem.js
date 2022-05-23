import React from 'react';
import {Col} from "react-bootstrap";
import Rating from "react-rating";
import {FaStar} from "@react-icons/all-files/fa/FaStar";

const ReviewItem = ({review, reviewPage}) => {
    const {name, comment, stars, avatar} = review;
    const updatedComment = !reviewPage ? comment.slice(0, 200) + '...' : comment;

    return (
        <Col lg={4} md={4} className={reviewPage ? 'mb-4' : 'mb-md-0 mb-4'}>
            <div className="review-item h-100">
                <div className="review-header">
                    <div className="review-avatar">
                        <img src={avatar} alt="avatar" className='img-fluid'/>
                    </div>
                    <div className="review-info">
                        <p className="name">{name}</p>
                        <Rating
                            initialRating={stars}
                            emptySymbol={<FaStar/>}
                            fullSymbol={<FaStar style={{color: 'goldenrod'}}/>}
                            readonly
                        />
                    </div>
                </div>
                <p className="feedback-text">{updatedComment}</p>
            </div>
        </Col>
    );
};

export default ReviewItem;