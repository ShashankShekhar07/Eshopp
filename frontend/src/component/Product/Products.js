import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors,getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography  from "@material-ui/core/Typography";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = ({match}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage,setCurrentPage] = useState(1);
  const [price,setPrice] = useState([0,25000]);//1
  const [category,setCategory] = useState("");
  const [ratings,setRatings] = useState(0);
  const {products,loading,error,productsCount,resultPerPage,filteredProductsCount} = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }

  const priceHandler = (event,newPrice) => {//2
    setPrice(newPrice)
  }
  const ratingHandler = (event,newRating) => {
    setRatings(newRating)
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword,currentPage,price,category,ratings));
  },[dispatch,currentPage,keyword,price,category,ratings,alert,error]);

  let count=filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>

          <MetaData title="PRODUCTS -- ESHOPP
          " />
            <h2 className="productsHeading">Products</h2>
            <div className="products">
                {products && products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            {keyword && <div className = "filterbox">
              <Typography>Price</Typography>

              <Slider 
              value={price} //3
              onChange={priceHandler}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
              />
              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li className="category-link" key={category} onClick = {()=>setCategory(category)}>
                      {category}
                  </li>
                ))}
              </ul>

              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={ratings}
                  onChange={ratingHandler}
                  aria-labelledby= "continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>

            </div>}

            {resultPerPage < count && (      
            <div className="paginationBox">
                <Pagination 
                activePage={currentPage} 
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
                />
            </div>)}

        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;