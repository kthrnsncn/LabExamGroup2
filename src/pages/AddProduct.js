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
