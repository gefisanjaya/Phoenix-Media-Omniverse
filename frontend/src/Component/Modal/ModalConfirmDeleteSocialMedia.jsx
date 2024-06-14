import React from 'react';

const ModalConfirmDeleteSocialMedia = ({ show, onClose, onConfirm, socialMedia }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[28rem]">
        <h2 className="text-lg font-semibold mb-4">Delete Social Media Account</h2>
        <p className="mb-4">Are you sure you want to delete the social media account <strong>{socialMedia.username}</strong> on <strong>{socialMedia.platform}</strong>?</p>
        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="mr-4 px-4 py-2 bg-gray 00 text-white rounded-lg">Cancel</button>
          <button type="button" onClick={onConfirm} className="px-4 py-2 bg-[red] text-white rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDeleteSocialMedia;
