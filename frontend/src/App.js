import './App.css';
import Header from "./component/layout/Header/Header.js"
import { useEffect} from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Footer from "./component/layout/Footer/Footer.js"
import WebFont from "webfontloader"
import React from "react";
import Home from "./component/Home/Home.js";
import Loader from './component/layout/Loader/Loader.js';
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp.js';
// import { isAuthenticatedUser } from '../../backend/middleware/auth.js';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import { UpdateProfile } from './component/User/UpdateProfile.js';
import { UpdatePassword } from './component/User/UpdatePassword.js';
import {ForgotPassword} from "./component/User/ForgotPassword.js";
import { ResetPassword } from './component/User/ResetPassword.js';
import {Cart} from './component/Cart/Cart.js';

function App() {

  const {isAuthenticated,user} = useSelector((state) => state.user); 
  
  useEffect(() => {
  WebFont.load({
    google: {
      families: ["Roboto", "Droid Sans", "Chilanka"],
    },
  });
}, []);

  return (

<Router>
      <Header />
        <Routes>
        {/* {isAuthenticated && <UserOptions user={user}/>}
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/product/:id" element={<ProductDetails/>}/>
        <Route exact path="/products" element={<Products/>} />
        <Route path="/products/:keyword" element={<Products/>}/>
        <Route exact path="/search" element={<Search/>}/>
        <Route exact path="/search" element={<Search/>}/>
        <Route exact path="/account" element={<Profile/>} />
        <Route exact path="/login" element={<LoginSignUp/>} /> */}

        {isAuthenticated && <UserOptions user = {user}/>}
        
        <Route exact path="/" component={Home} />
        
        <Route exact path="/product/:id" component={ProductDetails} />
        
        <Route exact path="/products" component={Products} />
        
        <Route path="/products/:keyword" component={Products} />
        
        <Route exact path="/search" component={Search} />
        
        <ProtectedRoute exact path="/login" component={LoginSignUp}/>        

        <ProtectedRoute exact path="/me/update" component={UpdateProfile}/>   

        <ProtectedRoute exact path="/password/update" component={UpdatePassword}/>   

        <Route exact path="/password/forgot" component={ForgotPassword}/>   

        <Route exact path="/password/reset/:token" component={ResetPassword}/>   

        <Route exact path="/cart" component={Cart}/>

        </Routes>        
        <Footer/>
  </Router>
  );
}

export default App;


