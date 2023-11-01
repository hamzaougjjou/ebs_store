import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'

import watch from "./../../assets/img/watch.jfif"
import phone from "./../../assets/img/phone.jfif"
import pc from "./../../assets/img/pc.jfif"
import airpods from "./../../assets/img/airpods.jpg"
import Reviews from './reviews/Reviews'
import Description from './description/Description'
import Report from './report/Report'
// import axios from 'axios'
// import { mainUrl } from '../../config'

import "./../../assets/css/bookItem.css"
import { booksList } from '../books/data'
import BookItem from '../books/bookItem'
import { BookItemDetailsHeaderLoading } from "./../../elements/loading/Index"
function BookItemDetails() {
  let myActivClass = ({ isActive }) => isActive ? 'title-active' : '';

  let [product, setProduct] = useState({});
  const mainImageSrcConst = airpods;
  let [loadingProduct, setLoadingProduct] = useState(!false);
  let [mainImageSrc, setMainImageSrc] = useState(mainImageSrcConst);
  let subImagesSrc = [mainImageSrcConst, pc, phone, watch];
  let [showOverlay, setShowOverlay] = useState(false);

  let [quantity, setQuantity] = useState(1);

  const updateMainImageSrc = (img) => {
    setMainImageSrc(img)
  }

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setLoadingProduct(false);
      clearTimeout(timeOut);
    }, 2000);


  },)

  const decreaseQuantity = (img) => {
    if (quantity > 1)
      setQuantity(quantity - 1)
  }

  let { id } = useParams();


  return (
    id ?
      <>


        {
          showOverlay &&
          <div className="overlay-product-img-container">
            <i id="overlay-product-close" className="fa fa-close" onClick={() => setShowOverlay(false)}></i>
            <img src={mainImageSrc} alt="" id="overlay-product-img" />
          </div>
        }


        <div className="book-item-container">

          {
            loadingProduct ? <BookItemDetailsHeaderLoading />

              :

              <div className="product-container" id="product-container">

                <div className="product-image">
                  <section className="main-img-container">
                    <img
                      onClick={() => setShowOverlay(true)}
                      id="main-img" className="main-img" src={mainImageSrc} alt="product" />
                  </section>
                  <section className="sub-images-container">

                    {
                      subImagesSrc.map((image, index) => {
                        return <img
                          onClick={() => updateMainImageSrc(image)}
                          key={index} src={image} alt={image} className="sub-image-item" />
                      })
                    }
                  </section>
                </div>
                <div className="product-info">
                  <h1 className="product-title" id="product-title">

                    {product.title}

                  </h1>
                  <div className="product-price-container">

                    <p id="current-price" className="current-price"><b>
                      {product.price}
                    </b></p>

                    <span className="curency">MAD</span>
                    <p className="old-price" id="old-price"><b>250</b></p>
                    <span id="old-curency" className="curency">MAD</span>

                  </div>
                  <section className="product-description" id="product-description">
                    {product.description}...
                  </section>
                  <section className="product-quantity">
                    <p>quantity</p>
                    <div className='quantity-container'>
                      <i onClick={decreaseQuantity} className="fa fa-minus"></i>
                      <p className="quantity bg"> {quantity < 10 ? "0" + quantity : quantity}</p>
                      <i onClick={() => setQuantity(quantity + 1)} className="fa fa-plus"></i>
                    </div>
                  </section>
                  <button className="btn-add-to-cart">Add To Cart</button>
                  <button className="btn-buy-now">Buy now</button>
                </div>
              </div>
          }

          <div className="desc-report-container">

            <div id="titles">
              <NavLink to="./" id="desc-title" className={myActivClass}>
                Description
              </NavLink>
              <NavLink to='./reviews' id="reviews-title" className={myActivClass}>
                Reviews(1)
              </NavLink>
              <NavLink to='./report' id="report-title" className={myActivClass}>
                Report
              </NavLink>
            </div>


            <Routes>
              <Route index element={<Description />} exact />
              <Route path="/" element={<Description />} />
              <Route path='/reviews' element={<Reviews />} />
              <Route path='/report' element={<Report />} />
            </Routes>

          </div>

          <div className="related-books">

            <h1 className="related-books-title">
              منتوجات دات صلة
            </h1>

            <div className='booksContainer'>
              {
                booksList.map((book, index) => (
                  index > 4 ? null :
                    <BookItem key={index} book={book} />
                )
                )
              }

            </div>
            <Link to="/products" className="btn-show-more-products">
              عرض كل المنتوجات
            </Link>

          </div>

        </div>
      </>
      :
      <h2 className='tct-center'>id not passed</h2>
  )
}

export default BookItemDetails