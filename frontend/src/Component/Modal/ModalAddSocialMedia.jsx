import React, { useState, useEffect } from 'react';

const ModalAddSocialMedia = ({ show, onClose, onSubmit, clients }) => {
  const [id_klien, setIdKlien] = useState('');
  const [username, setUsername] = useState('');
  const [sosmed_id, setSosmedId] = useState('');

  useEffect(() => {
    if (show) {
      setIdKlien('');
      setUsername('');
      setSosmedId('');
    }
  }, [show]);

  if (!show) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ id_klien, platform: 'instagram', username, sosmed_id });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[28rem]">
        <h2 className="text-lg font-semibold mb-4">Add Social Media</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Client</label>
            <select
              value={id_klien}
              onChange={(e) => setIdKlien(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            >
              <option value="">Select Client</option>
              {clients.map(client => (
                <option key={client._id} value={client._id}>
                  {client.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Platform</label>
            <input type="text" value="instagram" className="w-full border border-gray-300 p-2 rounded-lg" disabled />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Social Media ID</label>
            <input type="text" value={sosmed_id} onChange={(e) => setSosmedId(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg" required />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 px-4 py-2 bg-gray text-white rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-purple text-white rounded-lg">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddSocialMedia;
