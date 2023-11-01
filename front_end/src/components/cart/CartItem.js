import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import watch from "./../../assets/img/watch.jfif"

function CartItem({ item, onDelete }) {

    let [itemCount, setItemCount] = useState( item.quantity );
    let [btnOpacity, setBtnOpacity] = useState(0.5);

    const increaseItemCount = () => {
        setItemCount(itemCount + 1)
    }
    const decreaseItemCount = () => {
        if (itemCount > 1)
            setItemCount(itemCount - 1);
    }
    useEffect(() => {
        if (itemCount > 1)
            setBtnOpacity(1);
        else
            setBtnOpacity(0.5);
    }, [itemCount]);


    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        // onDelete(item.id); // Pass the item ID to the parent component for deletion
        onDelete(item);
        setShowConfirmation(false);
    };

    return (

        <>
            {showConfirmation && (
                <div className="deleting-overlay">
                    <div className="confirmation-box">
                        <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, provident </p>
                        <div className="confirmation-buttons">
                            <button className="confirm-button" onClick={handleConfirmDelete}>Confirm</button>
                            <button className="cancel-button" onClick={() => setShowConfirmation(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}


            <li className="cart-item">
                <div className="cartSection">

                    <Link to={ "/books/"+item.id } >
                        <p className="itemNumber">#{item.id}</p>
                    </Link>

                    <img src={watch} alt="product" />
                    <section className="increase-section">
                        <i onClick={decreaseItemCount} className="fa fa-minus"
                            style={{ opacity: btnOpacity }}
                        ></i>
                        <p className="quantity">
                            {
                                (itemCount < 10) ? <> 0 {itemCount} </> : <>{itemCount} </>
                            }

                        </p>
                        <i onClick={increaseItemCount} className="fa fa-plus"></i>
                        <p className="unit-price">x {item.price} </p>
                        <p> <b>= {item.price * itemCount} DH </b> </p>
                    </section>

                </div>

                <div className="item-name-container">

                    <h3>{item.title}</h3>
                </div>

                <div className="prodTotal">
                    <p>{item.price} <span>dh</span></p>
                </div>

                <div className="removeWrap">
                    <i onClick={handleDeleteClick} className="fa fa-remove"></i>
                </div>

            </li>

        </>
    )
}

export default CartItem