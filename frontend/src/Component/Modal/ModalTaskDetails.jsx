import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalTaskDetails = ({ show, onClose, task, onDelete, role, onUpdate }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    deskripsi: '',
    assign: '',
    tenggat_waktu: new Date(),
  });

  useEffect(() => {
    if (task) {
      setFormData({
        deskripsi: task.deskripsi,
        assign: task.assign,
        tenggat_waktu: new Date(task.tenggat_waktu),
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      tenggat_waktu: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(task._id, formData);
    setIsEditMode(false);
    toast.success("Task updated successfully!");
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-[28rem]">
        <h2 className="text-lg font-semibold mb-4">Task Details</h2>
        {isEditMode ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Assign</label>
              <input
                type="text"
                name="assign"
                value={formData.assign}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
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
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <DatePicker
                selected={formData.tenggat_waktu}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="Pp"
                className="w-full border border-gray-300 p-2 rounded text-center"
                required
              />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={() => {
                    setIsEditMode(false);
                    onClose();
                  }} className="mr-4 px-4 py-2 bg-gray text-white rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-purple text-white rounded">Save</button>
            </div>
          </form>
        ) : (
          <>
            <p className='text-left'><strong>Assigned to:</strong> {task.assign}</p>
            <p className='text-left'><strong>Description:</strong> {task.deskripsi}</p>
            <p className='text-left'><strong>Due Date:</strong> {new Date(task.tenggat_waktu).toLocaleString()}</p>
            {role === 'content_planner' && (
              <div className="flex justify-end mt-4">
                <button type="button" onClick={() => {
                    setIsEditMode(false);
                    onClose();
                  }} className="mr-4 px-4 py-2 bg-gray text-white rounded">Cancel</button>
                <button
                  type="button"
                  onClick={() => setIsEditMode(true)}
                  className="mr-4 px-4 py-2 bg-blue text-white rounded"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDelete(task._id);
                    onClose();
                    toast.success("Task deleted successfully!");
                  }}
                  className="px-4 py-2 bg-[red] text-white rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalTaskDetails;
