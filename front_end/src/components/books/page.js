import React from 'react'
import BookItem from './bookItem';
import "./books.css";
import { booksList } from './data';
import Search from './Search';

function Books() {

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
// electoral
export default Books