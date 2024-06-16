import React, { useState } from "react";

const ModalExport = ({ showModal, onClose, onConfirm, clients }) => {
  const [range, setRange] = useState("this_week");
  const [client, setClient] = useState("all_clients");
  const [format, setFormat] = useState("pdf");

  const handleConfirm = () => {
    onConfirm({ range, client, format });
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[30rem]">
        <h2 className="text-xl font-bold mb-4">Export Content Plan</h2>
        <div className="mb-4 text-left">
          <label className="block mb-2">Range</label>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
          </select>
        </div>
        <div className="mb-4 text-left">
          <label className="block mb-2">Client</label>
          <select
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="all_clients">All Clients</option>
            {clients.map((client, index) => (
              <option key={index} value={client}>
                {client}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 text-left">
          <label className="block mb-2">Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-4 bg-gray text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-purple text-white px-4 py-2 rounded"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalExport;
