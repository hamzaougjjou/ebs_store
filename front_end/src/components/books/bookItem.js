import { useEffect, useState } from 'react';

import { BsHeart, BsShare, BsFillSuitHeartFill, BsTrash, BsPlusCircle } from 'react-icons/bs';

import { Link } from 'react-router-dom';
import { PopUpMessages } from '../../elements/PopUpMessages';
import { connect, useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from '../../redux/reducers/cartSlice';
import { appUrl } from '../../config';
import { addToLikes, removeFromLikes } from '../../redux/reducers/likesSlice';

function BookItem({ book }) {

    let [mainImage, setMainImage] = useState(`images/${book.mainImage}`);
    const bookId = book.id;
    let [popUpMessage, setPopUpMessage] = useState(null);
    let [bookLiked, setBookLiked] = useState(false);

    let [existIncart, setExistInCart] = useState(false);
    const likesItems = useSelector(state => state.likes);

    const cartItems = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleLikes = (item) => {
        bookLiked ?
            dispatch(removeFromLikes(item))
            :
            dispatch(addToLikes(item));
        setBookLiked(!bookLiked);

    };
    // const handleDeslikeItem = (item) => {
    //     dispatch(removeFromLikes(item));
    //     setBookLiked(false);
    // };
    //check if book item already liked
    useEffect(() => {
        let cartLocal = JSON.parse(localStorage.getItem("likes"));
        if (cartLocal == null)
            return;
        for (let i = 0; i < cartLocal.length; i++) {
            const element = cartLocal[i];
            if (element.id == book.id)
                setBookLiked(true);
        }

    }, []);

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
        setExistInCart(true);
    };
    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item));
        setExistInCart(false);
    };
    //check if book item exists in cart
    useEffect(() => {
        let cartLocal = JSON.parse(localStorage.getItem("cart"));
        if (cartLocal == null)
            return;

        for (let i = 0; i < cartLocal.length; i++) {
            const element = cartLocal[i];
            if (element.id == book.id)
                setExistInCart(true);
        }

    }, []);


    let copyBookLinkFunc = async () => {

        await navigator.clipboard.writeText(appUrl + "/books/" + bookId);

        setPopUpMessage(<PopUpMessages
            title="copy book link"
            message="book link copied successfully"
            hide={setPopUpMessage}
        />);
    }

    return (
        <>
            <div className="bookItem">
                <section className="product">

                    <div className="product__photo">
                        <div className="photo-container">
                            <div className="photo-main">
                                <div className="controls icons">

                                    <BsShare onClick={copyBookLinkFunc} />

                                    <span onClick={() => handleLikes(book)} >
                                        {
                                            bookLiked ? <BsFillSuitHeartFill
                                                style={{
                                                    fill: "red"
                                                }}
                                            />
                                                :

                                                <BsHeart />

                                        }

                                    </span>

                                </div>
                                <img
                                    src={mainImage}
                                    alt="green apple slice"
                                />
                            </div>
                            <div className="photo-album">
                                <ul>

                                    <li>
                                        <img
                                            onClick={() => setMainImage(`${mainImage}`)}
                                            src={mainImage} alt={mainImage} />
                                    </li>
                                    {
                                        book.subImages.map((image, index) =>
                                            <li key={index}>
                                                <img
                                                    onClick={() => setMainImage(`images/${image}`)}
                                                    src={`images/${image}`} alt={image} />
                                            </li>
                                        )
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="product__info">

                        <div className="title">
                            <h1> {book.title} </h1>
                            <span>pages: {book.pages}</span>
                        </div>

                        <section>
                            <div className="price">
                                MAD <span> {book.price} </span>
                            </div>
                            <div className="variant">
                                <h3>AUTHOR</h3>
                                <p> {book.author} </p>
                            </div>
                        </section>

                        <div className="description">

                            <h3>Year</h3>
                            {book.year}
                            <br />
                            In my opinion is the most straightforward method to achieve pushing something
                            inside the clipboard, check this out I've used that to modify data while native
                            copying actione, a page
                            <p>
                            </p>

                            <h3>
                                <Link className='viewDetailsLink' to={"/books/" + bookId} >
                                    view details
                                </Link>
                            </h3>
                        </div>

                        {

                            existIncart ?
                                <button
                                    onClick={() => handleRemoveFromCart(book)}
                                    className="btn-add-to-cart buy--btn">
                                    REMOVE FROM CART
                                    <i>
                                        <BsTrash />
                                    </i>
                                </button>
                                :
                                <button
                                    onClick={() => handleAddToCart({ ...book, quantity: 1 })}
                                    className="btn-add-to-cart buy--btn">ADD TO CART
                                    <i>
                                        <BsPlusCircle />
                                    </i>
                                </button>

                        }



                    </div>

                </section>

            </div>
            {
                popUpMessage
            }
        </>
    )
}

export default BookItem;