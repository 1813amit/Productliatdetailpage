import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./Component/ProductList";
import ProductDetailsPage from "./Component/ProductDetailsPage";

function App() {
  return (
    
    <>
    
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
    </Routes>
    </>
 
   
  );
}

export default App;
