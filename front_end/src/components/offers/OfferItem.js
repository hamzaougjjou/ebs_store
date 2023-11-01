import BookItem from '../books/bookItem';
import './offers.css'

function OfferItem({ book }) {

    return (

        <div className='offer-item-container'>
            <p className="discount"><span>-</span>20 <span>%</span></p>
            <BookItem book={book} />
        </div>
    )
}

export default OfferItem