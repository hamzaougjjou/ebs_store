// import React, { useEffect } from 'react'
import Slider from '../slider/Slider'
import Collections from './collections/Collections'
// import Footer from '../footer/Footer'
// import NewsLetter from './NewsLetter'
import Offers from '../offers/Offers'
import Books from './books/Books'
// import axios from 'axios'
// import { mainUrl } from '../../config'

function Home() {



  return (
    <>
      <Slider />
      <Collections />
      <Offers />
      <Books />
    </>
  )
}

export default Home