import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig'; // Adjust the path as necessary
import Sidebar from '../Component/Sidebar';
import ModalAddUser from '../Component/Modal/ModalAddUser';
import ModalConfirmDelete from '../Component/Modal/ModalConfirmDelete';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (user) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/users', user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers([...users, response.data]);
      setShowModal(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEditUser = async (user) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`/users/${selectedUser._id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map(u => (u._id === selectedUser._id ? response.data : u)));
      setShowModal(false);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/users/${selectedUser._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(u => u._id !== selectedUser._id));
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  return (
    <div className="flex w-full h-full no-scrollbar">
      <Sidebar />
      <div className="flex h-screen w-[85%] p-4">
        <div className="w-full bg-white p-4 rounded shadow">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">User Management</h2>
            <button className="bg-purple hover:bg-lightpurple text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>Add User</button>
          </div>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border w-20">Index</th>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-lightpurple hover:bg-opacity-50">
                  <td className="px-4 py-2 border w-auto">{index + 1}</td>
                  <td className="px-4 py-2 border">{user.username}</td>
                  <td className="px-4 py-2 border">{user.role}</td>
                  <td className="px-4 py-2 border">
                    <button className="bg-blue hover:bg-midnight text-white px-2 py-1 rounded mr-2" onClick={() => handleEditClick(user)}>Edit</button>
                    <button className="bg-[red] hover:bg-gray text-white px-2 py-1 rounded" onClick={() => handleDeleteClick(user)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalAddUser
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setIsEditMode(false);
        }}
        onSubmit={isEditMode ? handleEditUser : handleAddUser}
        initialData={selectedUser}
      />
      <ModalConfirmDelete
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteUser}
        user={selectedUser}
      />
    </div>
  );
};

export default UserManagement;
