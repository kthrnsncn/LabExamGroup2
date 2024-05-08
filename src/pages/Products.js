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
