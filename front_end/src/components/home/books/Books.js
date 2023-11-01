import React from 'react'
import { Link } from 'react-router-dom'
import BookItem from '../../books/bookItem'
import { booksList } from '../../books/data'
function Books() {
    return (
        <div className="products-container">
            <h1>
                كتب الاكثر مبيعا
            </h1>

            <div className='booksContainer'>
              {
                booksList.map((book, index) => (
                  index > 4 ? null :
                    <BookItem key={index} book={book} />
                )
                )
              }

            </div>
            <Link to="books" className="btn-show-more-products">
                عرض المزيد
            </Link>
        </div>
    )
}

export default Books