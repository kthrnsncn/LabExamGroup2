import React, { useState } from 'react';
import { registerUser } from '../api'; 
import { Form, Button, Card, Alert } from 'react-bootstrap'; 

const RegistrationForm = () => {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState(null);
 const [successMessage, setSuccessMessage] = useState('');

 const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const userData = { name, email, password };
      const response = await registerUser(userData);

      console.log('Registration successful:', response);
      setSuccessMessage('Registration successful!');
      setError(null);

      
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
 };

 return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '500px' }}>
        <Card.Header className="mb-4">
          <h2>Register</h2>
        </Card.Header>
        <Card.Body>  
          <Form onSubmit={handleRegistration} style={{ width: '100%' }}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3"> 
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ width: '100%' }}>Register</Button>
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
        </Card.Body>
      </Card>
    </div>
 );
};

export default RegistrationForm;
