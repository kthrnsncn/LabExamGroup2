import React, { useState, useEffect } from 'react';
import { Form, Button, } from 'react-bootstrap';

const ProductForm = ({ product, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    product_image: null,
  });

  const [formErrors, setFormErrors] = useState({});
  useEffect(() => {
    if (product) {
      const { name, description, price } = product;
      setFormData({ name, description, price, product_image: null });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const updatedValue = name === 'product_image' ? files[0] : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: updatedValue }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
    }
    if (!formData.description.trim()) {
      errors.description = 'Description is required.';
    }
    if (!formData.price.trim()) {
      errors.price = 'Price is required.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const updatedFormData = new FormData();
      updatedFormData.append('name', formData.name.trim());
      updatedFormData.append('description', formData.description.trim());
      updatedFormData.append('price', formData.price.trim());
      if (formData.product_image) {
        updatedFormData.append('product_image', formData.product_image);
      }

      await onSubmit(updatedFormData);
      setFormData({
        name: '',
        description: '',
        price: '',
        product_image: null,
      });
      setFormErrors({}); 

      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);

      if (error.response && error.response.data && error.response.data.errors) {
        const { errors } = error.response.data;
        const processedErrors = {};
        Object.keys(errors).forEach((key) => {
          processedErrors[key] = errors[key].join(' '); 
        });

        setFormErrors(processedErrors);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="productName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          isInvalid={!!formErrors.name}
          required
        />
        <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="productDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          isInvalid={!!formErrors.description}
          required
        />
        <Form.Control.Feedback type="invalid">{formErrors.description}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="productPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          isInvalid={!!formErrors.price}
          required
        />
        <Form.Control.Feedback type="invalid">{formErrors.price}</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Update Product
      </Button>
    </Form>
  );
};

export default ProductForm;
