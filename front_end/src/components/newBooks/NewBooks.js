import React from 'react'
import BookItem from '../books/bookItem'
import { booksList } from '../books/data'
import Search from './Search'

function NewBooks() {
    return (
        <>
            <section className='booksHeader'>
                <h1> جميع الكتب المتوفرة </h1>
            </section>

            <Search />


            <div className='booksContainer'>
                {
                    booksList.map((book, index) => (
                        <BookItem key={index} book={book} />
                    )
                    )
                }

            </div>
            {/* <Pagination /> */}
        </>
    )
}

export default NewBooks