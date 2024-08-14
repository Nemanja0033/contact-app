import React from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ onClose, isOpen, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-neutral-800 p-4 rounded shadow-lg">
        <div className="absolute top-4 right-4">
          <AiOutlineClose onClick={onClose} className="text-2xl cursor-pointer text-neutral-200" />
        </div>
        <div className="relative">
          {children}
        </div>
      </div>
      <div onClick={handleOverlayClick} className="fixed inset-0 bg-black bg-opacity-50 z-40" />
    </>,
    document.getElementById('modal-root')
  );
};

export default Modal;
