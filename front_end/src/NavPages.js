import React from 'react'
import { Route, Routes } from 'react-router-dom'


import Profile from './components/profile/Profile'
import BookItemDetails from './components/bookItem/BookItemDetails'
import Books from './components/books/page'
import NewBooks from './components/newBooks/NewBooks.js'

import Cart from './components/cart/Cart'
import Checkout from './components/checkout/Checkout'
import CheckoutThanks from './components/checkout/CheckoutThanks'
import CollectionType from './components/collection/CollectionType'
import Collections from './components/collections/Collections'
import Contact from './components/contact/Contact'
import Error_404 from './components/errors/Error_404'
import Home from './components/home/Home'

function NavePages() {
  return (
    <div>

      <Routes>
        <Route index element={<Home />} ></Route>
        <Route path='/contact' element={<Contact />} ></Route>

        <Route path='/collections' element={<Collections />} ></Route>
        <Route path='/collections/:id' element={<CollectionType />} ></Route>

        <Route path='/cart' element={<Cart />} ></Route>

        <Route path='/books' element={<Books />} ></Route>
        <Route path='/new/books' element={<NewBooks />} ></Route>

        <Route path='/profile' element={<Profile />} ></Route>

        <Route path='/books/:id/*' element={<BookItemDetails />} >

        </Route>

        <Route path='cart/checkout' element={<Checkout />} ></Route>
        <Route path='cart/checkoutthanks' element={<CheckoutThanks />} ></Route>

        <Route path='/*' element={<Error_404 />} ></Route>
      </Routes>

    </div>
  )
}

export default NavePages