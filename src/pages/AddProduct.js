// ./pages/AddProductPage.js

import React from 'react';
import AddProduct from '../components/AddProductForm'; 
import { ToastContainer } from 'react-toastify';

const AddProductPage = () => {
 return (
    <div>
        <ToastContainer />
      <AddProduct />
    </div>
 );
};

export default AddProductPage;


Products.js
import React from 'react';
import ProductList from '../components/ProductList'


const Products = () => {
  return (
    <div>
      <div className="card m-4">
        <h5 className="card-header">List of Products</h5>
        <div className="card-body"><ProductList></ProductList></div>
        
      </div>
    </div>
  );
};

export default Products;
