import React from 'react'
import ReviewItem from './ReviewItem'
import './../../../assets/css/reviews.css'
function Reviews() {
    return (
        <div id="reviews">
            <div className="reviews-container">
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
            </div>
        </div>
    )
}

export default Reviews