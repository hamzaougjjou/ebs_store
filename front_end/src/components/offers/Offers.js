import React from 'react'
import { booksList } from '../books/data'
import OfferItem from './OfferItem'
import "./offers.css";

function Offers() {
    return (
        <div className="best-offers-container">
            <h1>اهم العرورض</h1>

            <div className='booksContainer'>
                {
                    booksList.map((book, index) => (
                        index < 6 && <OfferItem key={index} book={book} />
                    )
                    )
                }

            </div>
        </div>
    )
}

export default Offers