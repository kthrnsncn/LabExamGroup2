import React, { useState } from 'react';
import { addProduct } from '../api';
import { Form } from 'react-bootstrap';

const ProductForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    product_image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({ ...formData, product_image: imageFile });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append('name', formData.name);
    formDataWithImage.append('description', formData.description);
    formDataWithImage.append('price', formData.price);
    formDataWithImage.append('product_image', formData.product_image);

    try {
      await addProduct(formDataWithImage);
      setFormData({ name: '', description: '', price: '', product_image: null }); // Call the onSuccess callback after successful form submission
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="product_image">
          <Form.Label>Image:</Form.Label>
          <Form.Control
            type="file"
            name="product_image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </Form.Group>

        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </Form>
    </div>
  );
};

export default ProductForm;