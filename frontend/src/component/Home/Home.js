import React,{Fragment, useEffect} from 'react'
import "./Home.css"
import Product from "./Product.js"
import MetaData from "../layout/MetaData.js"
import {getProduct} from "../../actions/productAction.js"
import {useSelector,useDispatch} from "react-redux";
import Loader from '../layout/Loader/Loader.js'
import { useAlert } from 'react-alert'

const Home = () => {

  const alert = useAlert()
  const dispatch = useDispatch();
  const {loading,error,products,productsCount} = useSelector((state) => state.products)
  // console.log(products);

  useEffect(()=>{
    if(error){
      return alert.error(error);
    }
    dispatch(getProduct());
  },[dispatch,error]);

  return (
    <Fragment>
      {loading ? <Loader/> : (
        <Fragment>
        <MetaData title="ESHOPP"/>
        <div className="banner">
            <p>Welcome to EShopp</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
                <button>
                  Scroll 
                </button>
            </a>
        </div>

        <h2 className="homeHeading">Featured Products</h2>

        <div className='container' id="container">

            {
            products && products.map((product) => 
              (<Product product={product}/>))
            }

        </div>

    </Fragment>
      )}
    </Fragment>
  );
};

export default Home;