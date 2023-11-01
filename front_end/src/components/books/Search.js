import React from 'react'

function Search() {
    return (
        <div className="search-container2">
            <form action="">
                <input type="text" placeholder="Search.." name="search" />

                    <select name="category" id="select-category">
                        <option value="all">الكل</option>
                        <option value="tvs">التلفازات</option>
                        <option value="watchs">الساعات</option>
                        <option value="phones">الهواتف</option>
                        <option value="laptops">الحواسيب</option>
                        <option value="airpuds">السماعات</option>
                        <option value="cheaper">الاقل سعرا</option>
                        <option value="expenssive">الاعلى سعرا</option>
                    </select>

                    <button type="submit">
                        <i className="fa fa-search"></i>
                    </button>
            </form>

        </div>
    )
}

export default Search