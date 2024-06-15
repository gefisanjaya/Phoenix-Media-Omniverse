import React from 'react';

const ModalAddClient = ({ show, onClose, onSubmit }) => {

  if (!show) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const nama = event.target.elements.nama.value;
    const email = event.target.elements.email.value;
    const alamat = event.target.elements.alamat.value;
    const deskripsi = event.target.elements.deskripsi.value;
    onSubmit({ nama, alamat, email, deskripsi });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-[28rem]">
        <h2 className="text-lg font-semibold mb-4">Add Client</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type='text' name="nama" className="w-full border border-gray p-2 rounded" required></input>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type='email' name="email" className="w-full border border-gray p-2 rounded" required></input>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Alamat</label>
            <input type='text' name="alamat" className="w-full border border-gray p-2 rounded" required></input>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="deskripsi" className="w-full border border-gray-300 p-2 rounded" required></textarea>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 px-4 py-2 bg-gray text-white rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-purple text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddClient;
