import React from 'react'
import image2 from './../../../assets/img/image2.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStarHalfAlt , faStar } from '@fortawesome/free-regular-svg-icons'
// import { fasSta }
// import { faPhone, faInstagram, faFacebook, faWhatsapp, faYoutube } from '@fortawesome/free-solid-svg-icons'
// import { faPingPongPaddleBall } from '@fortawesome/free-solid-svg-icons'

function ReviewItem() {
    return (
        <div className='review-item'>
            <img src={image2} alt='' className='profile-img' />
            <h3>Hamza ougjjou</h3>
            <div className='starts-c'>
                 <FontAwesomeIcon icon={faStar} className="icon" />
                 <FontAwesomeIcon icon={faStar} className="icon" />
                 <FontAwesomeIcon icon={faStar} className="icon" />
                 <FontAwesomeIcon icon={faStarHalfAlt} className="icon" />
                 <FontAwesomeIcon icon={faStar} className="icon" />
            </div>
            <p className='review-content'>
                Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Ab doloremque et unde iusto veniam omnis?
            </p>
        </div>
    )
}

export default ReviewItem