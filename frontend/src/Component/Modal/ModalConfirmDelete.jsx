import React from 'react';

const ModalConfirmDelete = ({ show, onClose, onConfirm, user }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[28rem]">
        <h2 className="text-lg font-semibold mb-4">Delete User</h2>
        <p className="mb-4">Are you sure you want to delete the user <strong>{user.username}</strong>?</p>
        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="mr-4 px-4 py-2 bg-gray text-white rounded-lg">Cancel</button>
          <button type="button" onClick={onConfirm} className="px-4 py-2 bg-[red] hover:bg-gray text-white rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
