import React from 'react'
import { booksCategories } from '../collections/data'

function Search() {
    return (
        <div className="search-container2">

            <form action="">

                <input type="text" placeholder="Search.." name="search" />
                <select name="category" id="select-category">
                    <option value="all">الكل</option>
                    {
                        booksCategories.map((category) =>
                            <option key={category.id}
                                value={category.id} >
                                {category.name}
                            </option>

                        )
                    }
                </select>
                <button type="submit">
                    <i className="fa fa-search"></i>
                </button>

            </form>

        </div>
    )
}

export default Search