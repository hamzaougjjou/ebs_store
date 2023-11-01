import React from 'react'
import { useParams } from 'react-router-dom'
import BookItem from '../books/bookItem';
import { booksList } from '../books/data';
import "./../../assets/css/CollectionType.css"

import CollectionTypeHeader from './CollectionTypeHeader';

function CollectionType() {

    const { id } = useParams();

    return (
        <div>
            <CollectionTypeHeader id={id}/>

            <div className="products-container">

                <div className='booksContainer'>
                    {
                        booksList.map((book, index) => (
                            index > 4 ? null :
                                <BookItem key={index} book={book} />
                        )
                        )
                    }

                </div>

            </div>
        </div>
    )
}

export default CollectionType