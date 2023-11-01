import './App.css';
import './../src/assets/fontOwsome/css/all.min.css'
import './../src/assets/fontOwsome/css/all.css'
import './../src/assets/fontOwsome/css/brands.css'

import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import NewsLetter from './components/home/NewsLetter';
import Footer from './components/footer/Footer';
import NavPages from "./NavPages";
import { refreshLogin } from './redux/api';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { apiUrl } from './config';
import axios from 'axios';
import { getCategories, getCategoriesError, startGetCategories } from './redux/reducers/categoriesSlice';
// import css files



function App() {

  const dispatch = useDispatch();
  refreshLogin(dispatch);

  //get categories info
  useEffect(() => {

    let getData = async () => {
      dispatch(startGetCategories());
      await axios.get(apiUrl + "/api/categories")
        .then(res => {
          if (res.data.success) {
            dispatch(getCategories(res.data.categories));
            return false;
          }

        }).catch(
          (err) => {
            dispatch(getCategoriesError());
          }
        )
    }
    getData();
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <div className="mainContainer">
        <NavPages />
      </div>
      <NewsLetter />
      <Footer />
    </BrowserRouter>

  );
}

export default App;

// activeClassName="active"
// activeClassName="active"