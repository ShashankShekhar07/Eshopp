import './App.css';
import Header from "./component/layout/Header/Header.js"
import { useEffect} from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Footer from "./component/layout/Footer/Footer.js"
import WebFont from "webfontloader"
import React from "react";
import Home from "./component/Home/Home.js";
import Loader from './component/layout/Loader/Loader.js';

function App() {
  
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
        <Route exact path="/" element={<Home/>} />
        </Routes>
        
        <Footer/>
  </Router>
  );
}

export default App;

// import './App.css';
// import Header from "./component/layout/Header/Header.js";
// import { useEffect } from "react";
// import { createRoot } from 'react-dom/client';  // Import createRoot
// import { BrowserRouter } from "react-router-dom";  // Use BrowserRouter directly
// import { Route,Routes} from 'react-router-dom';
// import Footer from "./component/layout/Footer/Footer.js";
// import WebFont from "webfontloader";
// import React from "react";
// import Home from "./component/Home/Home.js";

// export default function App() {
//   useEffect(() => {
//     WebFont.load({
//       google: {
//         families: ["Roboto", "Droid Sans", "Chilanka"],
//       },
//     });
//   }, []);

//   return (
//     <BrowserRouter>  
//       <Routes><Route exact path="/" element={<Home />} /></Routes>
//       <Footer />
//     </BrowserRouter>
//   );
// }

// // Assuming this is within your index.js or main entry file:
// const root = createRoot(document.getElementById('root'));  // Create root
// root.render(<App />);  // Render App with createRoot



