import React from 'react';

const ModalAddTask = ({ show, onClose, onSubmit }) => {
  if (!show) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const assign = event.target.elements.assign.value;
    const deskripsi = event.target.elements.deskripsi.value;
    const status = 'available'; // default status as per schema
    const dueDate = event.target.elements.dueDate.value;
    const dueTime = event.target.elements.dueTime.value;
    const tenggat_waktu = `${dueDate}T${dueTime}`;
    onSubmit({ assign, deskripsi, status, tenggat_waktu });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-[28rem]">
        <h2 className="text-lg font-semibold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Assign</label>
            <select name="assign" className="w-full border border-gray-300 p-2 rounded" required>
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="content_planner">Content Planner</option>
              <option value="designer">Designer</option>
              <option value="videographer">Videographer</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" className="w-full border border-gray-300 p-2 rounded" required></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input type="date" name="dueDate" className="w-full border border-gray p-2 rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Due Time</label>
            <input type="time" name="dueTime" className="w-full border border-gray-300 p-2 rounded" required />
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