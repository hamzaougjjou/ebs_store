import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { apiStorageUrl } from '../../config';
import { CollectionItemLoading } from '../../elements/loading/Index';
// import { booksCategories } from './data'

function Collections() {

    const { loading, error, categories } = useSelector(state => state.categories);
console.log('====================================');
console.log( categories );
console.log('====================================');
    return (

        <>
            {/* =====================Collection start================== */}

            <section className='booksHeader'>
                <h2> تصنيفات الكتب </h2>
                {/* <h1> جميع الكتب المتوفرة </h1> */}
            </section>

            <div id="collections-container">
                {
                    loading ?
                        <>

                            <CollectionItemLoading />
                            <CollectionItemLoading />
                            <CollectionItemLoading />
                            <CollectionItemLoading />
                            <CollectionItemLoading />
                            <CollectionItemLoading />
                        </>
                        :
                        categories.map((category) => (
                            <section key={category.id} className="collection-item">
                                <img src={ apiStorageUrl + "/" + category.image} alt="" />
                                <div>
                                    <Link to={"/collections/" + category.id} className="collection-link">
                                        {category.name}
                                    </Link>
                                </div>
                            </section>
                        )
                        )
                }

            </div>
            {/* =====================Collection end================== */}

        </>
    )
}

export default Collections