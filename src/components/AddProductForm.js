import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addProduct } from '../api';


const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    product_image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductData({
      ...productData,
      product_image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('product_image', productData.product_image);

      const response = await addProduct(formData);
      console.log('Product added:', response);
      toast.success('Product successfully added!')
      window.location.href = 'http://localhost:3000/products';
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'top', marginTop: '8rem' }}>
      <Card style={{ width: '40rem' }}>
        <Card.Body>
          <Card.Header>Stock In Items</Card.Header>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="productName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="productDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={productData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="productImage">
              <Form.Label>Product Image:</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddProductForm;
