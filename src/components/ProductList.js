import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct, updateProduct, fetchProductById } from '../api'; 
import { Table, Button, Pagination, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemListTable = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); 
  const itemsPerPage = 5;

  const fetchData = async () => {
    try {
      const products = await fetchProducts();
      setItems(products);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteProduct(itemId);
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleUpdate = async (itemId) => {
    setSelectedItemId(itemId);
    setShowModal(true);

    try {
      const item = await fetchProductById(itemId);
      setSelectedItem(item);
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItemId(null);
    setSelectedItem(null);
  };

  const handleModalSubmit = async () => {
    try {
      await updateProduct(selectedItemId, selectedItem);
      setShowModal(false);
      setSelectedItemId(null);
      setSelectedItem(null);
      fetchData(); 
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>${item.price}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>{' '}
                <Button variant="info" onClick={() => handleUpdate(item.id)}>
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentItems.length < itemsPerPage || currentPage === totalPages}
          />
        </Pagination>
      </div>

      {/* Modal for Update */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Form>
              <Form.Group controlId="itemName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedItem.name}
                  onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="itemDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedItem.description}
                  onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="itemPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedItem.price}
                  onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ItemListTable;