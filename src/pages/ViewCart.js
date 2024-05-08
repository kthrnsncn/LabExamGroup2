import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkout, fetchCartItems, removeFromCart } from '../api'; // Adjust the import path as necessary

const Cart = () => {
 const [cartItems, setCartItems] = useState([]);
 const [showModal, setShowModal] = useState(false);
 const [checkoutData, setCheckoutData] = useState({
    billing_address: '',
    payment_method: '',
 });

 useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchCartItems();
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchData();
 }, []);

 const handleCheckOut = () => {
    setShowModal(true);
 };

 const handleCloseModal = () => {
    setShowModal(false);
 };

 const handleChange = (e) => {
    setCheckoutData({ ...checkoutData, [e.target.name]: e.target.value });
 };

 const handleRemoveFromCart = async (productId) => {
  try {
    await removeFromCart(productId);
    const updatedCartItems = cartItems.filter(item => item.product.id !== productId);
    setCartItems(updatedCartItems);
    toast.success('Product removed from cart.');
  } catch (error) {
    console.error('Error removing product from cart:', error);
    toast.error('Failed to remove product from cart.');
  }
};

 const totalPrice = cartItems.reduce((accumulator, item) => {
    const itemPrice = item.product && item.product.price ? parseFloat(item.product.price) : 0;
    const itemQuantity = item.quantity || 1;
    return accumulator + (itemPrice * itemQuantity);
 }, 0);

 const handleQuantityChange = (e, productId) => {
  const newQuantity = parseInt(e.target.value, 10);
  setCartItems(cartItems.map(item => 
     item.product.id === productId ? { ...item, quantity: newQuantity } : item
  ));
 };

 
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
     await checkout({
       ...checkoutData,
       total_price: totalPrice, 
     });
     toast.success('Order placed successfully.');
     setShowModal(false);
     setCartItems([]); 
  } catch (error) {
     console.error("Error submitting checkout:", error);
     toast.error("Error submitting checkout.");
  }
 };
 
 return (
    <div className="container">
      <ToastContainer />
      <div className="row shadow py-3 rounded m-5">
 <div className="col-12">
    <h2 className="mb-4">Your Cart</h2>
    {cartItems.length > 0 ? (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.product.name}</td>
                <td>${item.product.price}</td>
                <td>
                 {/* Quantity Input */}
                 <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e, item.product.id)}
                    min="1"
                    style={{ width: '50px' }}
                    className="form-control"
                 />
                </td>
                <td>
                 <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item.product.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between">
          <p className="text-bold">Total Price: ${totalPrice.toFixed(2)}</p>
          <button className="btn btn-success" onClick={handleCheckOut}>Check Out</button>
        </div>
      </>
    ) : (
      <p>Your cart is empty.</p>
    )}
 </div>
</div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="billingAddress">
              <Form.Label>Billing Address</Form.Label>
              <Form.Control type="text" name="billing_address" value={checkoutData.billing_address} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="paymentMethod">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select name="payment_method" value={checkoutData.payment_method} onChange={handleChange} required>
                  <option value="">Select a payment method</option>
                  <option value="credit_card">Gcash</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Cash on Delivery</option>
              </Form.Select>
            </Form.Group>

            <p className="text-bold">Total Price: ${totalPrice.toFixed(2)}</p>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
 );
};

export default Cart;

