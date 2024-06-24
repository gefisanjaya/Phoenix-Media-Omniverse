import React, { useEffect, useState } from 'react';

const ModalAddClient = ({ show, onClose, onSubmit, client }) => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    alamat: '',
    deskripsi: ''
  });

  useEffect(() => {
    if (client) {
      setFormData({
        nama: client.nama || '',
        email: client.email || '',
        alamat: client.alamat || '',
        deskripsi: client.deskripsi || ''
      });
    }
  }, [client]);

  if (!show) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-[28rem]">
        <h2 className="text-lg font-semibold mb-4">{client ? 'Edit Client' : 'Add Client'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full border border-gray p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className="w-full border border-gray p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
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
