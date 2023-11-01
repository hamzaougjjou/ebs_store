import React, { useEffect, useState } from 'react'
// import airpods from "./../../../assets/img/airpods.jpg"
import CollectionItem from './CollectionItem'
import {  CollectionItemLoading } from '../../../elements/loading/Index'
import { useSelector } from 'react-redux'

function Collections() {

    const { loading, error, categories } = useSelector(state => state.categories);

    return (
        <div className="collections-secttion">

            <>
                {
                    !error && <>
                        <h1 className='c-light'>التصنيفات</h1>

                        {
                            loading ?
                                <div>
                                    <CollectionItemLoading />
                                    <CollectionItemLoading />
                                    <CollectionItemLoading />
                                    <CollectionItemLoading />
                                    <CollectionItemLoading />
                                </div>
                                :
                                <div>
                                    {
                                        categories.map((category) =>
                                            <CollectionItem key={category.id}
                                                category={category} />)
                                    }
                                </div>
                        }

                    </>
                }
            </>

        </div>

    )
}

export default Collections