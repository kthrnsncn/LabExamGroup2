import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Register from './components/Register';
import Login from './components/login';
import Home from './pages/Shop';
import Products from './pages/Products';
import Cart from './pages/ViewCart';
import AddProductPage from './pages/AddProduct'; 



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = () => {
    setIsAuthenticated(true);
    setUserName('John Doe'); 
  };

 

  return (
    <Router>
      <div>
        <Navigation isAuthenticated={isAuthenticated} userName={userName} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/view-cart" element={<Cart />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/login"
            element={<Login handleLogin={handleLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
