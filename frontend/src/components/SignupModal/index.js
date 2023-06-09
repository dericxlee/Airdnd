import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

const SignupFormModal = () => {
  const [showModal, setShowModal] = useState(false);
  
  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(true)
  }

  const handleClose = (e) => {
    e.preventDefault()
    setShowModal(false)
  }

  return (
    <>
      <button onClick={handleClick}>Sign Up</button>
      {showModal && (
        <Modal onClose={handleClose}>
          <SignupForm handleClose={handleClose}/>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;