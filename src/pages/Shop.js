import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Pagination, Modal, Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from '../api';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track selected product
  const productsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products?page=${currentPage}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleAddToCart = async (productId, quantity = 1) => {
    try {
      const response = await addToCart(productId, quantity);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart due to a network error.');
    }
  };

  const openProductModal = (product) => {
    console.log('Opening modal for:', product);
    setSelectedProduct(product); // Set the selected product to display in the modal
  };

  const closeProductModal = () => {
    console.log('Closing modal');
    setSelectedProduct(null); // Reset selected product when closing the modal
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  console.log('Current Products:', currentProducts);
  console.log('Selected Product:', selectedProduct);

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Shop Page</h2>
      <div className="row">
        {currentProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              {product.product_image && (
                <img
                  src={`http://localhost:8000/storage/images/${product.product_image}`}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => openProductModal(product)} // Open modal on image click
                />
              )}
              <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div>
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">${product.price}</p>
                </div>
                <button className="btn btn-primary" onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      <Modal show={!!selectedProduct} onHide={closeProductModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            {selectedProduct && (
              <img
                src={`http://localhost:8000/storage/images/${selectedProduct.product_image}`}
                alt={selectedProduct.name}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  marginBottom: '20px',
                }}
              />
            )}
            <h4 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
              {selectedProduct?.name}
            </h4>
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>
              {selectedProduct?.description}
            </p>
            <p style={{ fontSize: '18px', color: 'green', fontWeight: 'bold' }}>
              Price: ${selectedProduct?.price}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeProductModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleAddToCart(selectedProduct?.id)}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Shop;