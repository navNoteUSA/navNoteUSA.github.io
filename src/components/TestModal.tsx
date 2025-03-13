import React from 'react';

interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TestModal: React.FC<TestModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Test Modal</h2>
        <p className="mb-4">This is a test modal to verify that modal functionality works correctly.</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TestModal; 