import React,{Fragment} from 'react'
// import {CgMouse} from "react-icons/ai"
import "./Home.css"
import Product from "./Product.js"

const product={
  name:"Blue Tshirt",
  images: [{url :"../../images/cover.jfif"}],
  price: "Rs 3000",
  _id: "Shashank",
};

const Home = () => {
  return (
    <Fragment>
        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
                <button>Scroll 
                </button>
            </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>

        <div className='container' id="container">
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
        </div>

    </Fragment>
  );
};

export default Home;