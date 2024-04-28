import React from 'react';
import './Modal.css'; // Ensure you create this CSS file for styling

// TODO: update to allow for mobile view

interface ModalProps {
  isOpen: boolean;    // Controls if the modal is open or not
  onClose: () => void; // Function to call when closing the modal
  children: React.ReactNode; // Content inside the modal
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
