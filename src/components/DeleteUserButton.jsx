import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import authService from "../services/auth.service";
import config from "../utils/config";

const DeleteUserModal = ({ show, handleClose, handleConfirm }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Deletion</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleConfirm}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);

const DeleteUserButton = ({ userId, onUserDeleted }) => {
  const { auth } = authService();
  const { token } = auth();
  const { SERVER_URL } = config();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const authorization_token = token ?? "";
  const handleConfirm = async () => {
    try {
      await axios.delete(`${SERVER_URL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${authorization_token}` },
      });
      if (onUserDeleted) {
        onUserDeleted(); // Call the refresh function
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete Account
      </Button>

      <DeleteUserModal
        show={show}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </>
  );
};

export default DeleteUserButton;
