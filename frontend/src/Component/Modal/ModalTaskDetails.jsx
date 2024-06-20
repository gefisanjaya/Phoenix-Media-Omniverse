import React from 'react';

const ModalTaskDetails = ({ show, onClose, task, onDelete, role }) => {
  if (!show) return null;

  const handleDelete = () => {
    onDelete(task._id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[30rem]">
        <h2 className="text-xl font-bold mb-4">Task Details</h2>
        <div className="mb-4 text-left">
          <label className="block"><b>Assigned:</b></label>
          <p>{task.assign}</p>
        </div>
        <div className="mb-4 text-left">
          <label className="block"><b>Due Date:</b></label>
          <p>{new Date(task.tenggat_waktu).toLocaleString("en-IE")}</p>
        </div>
        <div className="mb-4 text-left">
          <label className="block"><b>Description:</b></label>
          <p>{task.deskripsi}</p>
        </div>
        <div className="flex justify-end">
          {role === 'content_planner' && (
            <button
              onClick={handleDelete}
              className="bg-[red] text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-gray ml-4 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTaskDetails;
