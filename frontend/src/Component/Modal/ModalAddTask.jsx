import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ModalAddTask = ({ show, onClose, onSubmit, users }) => {
  const [startDate, setStartDate] = useState(new Date());

  if (!show) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = event.target.elements.assign.value;
    const deskripsi = event.target.elements.deskripsi.value;
    const status = 'available'; // default status as per schema
    const tenggat_waktu = startDate.toISOString();
    console.log({ userId, deskripsi, status, tenggat_waktu }); 
    onSubmit({ userId, deskripsi, tenggat_waktu });
  };

  // Filter users to show only designers and videographers
  const filteredUsers = users.filter(user => user.role === 'designer' || user.role === 'videographer');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-[28rem]">
        <h2 className="text-lg font-semibold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Assign</label>
            <select name="assign" className="w-full border border-gray-300 p-2 rounded" required>
              <option value="">Select user</option>
              {filteredUsers.map(user => (
                <option key={user._id} value={user._id}>{user.role}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="deskripsi" className="w-full border border-gray-300 p-2 rounded" required></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Due Date and Time</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-[25rem] border border-gray-300 p-2 rounded text-center"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 px-4 py-2 bg-gray text-white rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-purple text-white rounded">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddTask;