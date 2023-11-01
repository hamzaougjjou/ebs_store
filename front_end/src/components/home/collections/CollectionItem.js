import React from 'react'
import { Link } from 'react-router-dom'
import { apiStorageUrl } from '../../../config'

function CollectionItem({ category }) {
    return (

        <section className="collection-item">
            <img src={ apiStorageUrl + "/" + category.image} alt="" />
            <div>
                <Link to={'collections/' + category.id}
                    className="collection-link">
                    {category.name}
                </Link>
            </div>
        </section>
    )
}

export default CollectionItem