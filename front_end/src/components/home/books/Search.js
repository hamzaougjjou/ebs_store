import React from 'react'

function Search() {
    return (
        <div className="search-container">
            <div className="search">
                <form action="" method="get">
                    <input className="input-search" type="search" name="search" placeholder="Search.." />
                        <button className="btn-search">search</button>
                </form>
            </div>

            <div className="categories">
                <select name="caregory" id="search-caregory">
                    <option className="category-item" value="" selected>select category</option>
                    <option className="category-item" value="catergoty-1">catergoty 1</option>
                    <option className="category-item" value="catergoty-2">catergoty 2</option>
                    <option className="category-item" value="catergoty-3">catergoty 3</option>
                    <option className="category-item" value="catergoty-4">catergoty 4</option>
                    <option className="category-item" value="catergoty-5">catergoty 5</option>
                    <option className="category-item" value="catergoty-6">catergoty 6</option>
                </select>
            </div>

        </div>
    )
}

export default Search