import React, { useState, useEffect } from 'react';
import { fetchCartItems } from '../api'; // Adjust the import path as necessary

const Cart = () => {
 const [cartItems, setCartItems] = useState([]);

 useEffect(() => {
    const fetchAndSetCartItems = async () => {
      const items = await fetchCartItems();
      setCartItems(items);
    };

    fetchAndSetCartItems();
 }, []);

 const handleRemoveFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
 };

 return (
    <div>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
 );
};

export default Cart;