import React from 'react';

const ModalPublish = ({ showModal, onClose, onConfirm }) => {
  if (!showModal) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-lg font-semibold mb-4">Confirm Publish</h2>
        <p>Are you sure you want to publish this content?</p>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="mr-4 px-4 py-2 bg-gray text-white rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 bg-purple text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPublish;