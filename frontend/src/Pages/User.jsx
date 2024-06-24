import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig'; // Adjust the path as necessary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Component/Sidebar';
import ModalAddUser from '../Component/Modal/ModalAddUser';
import ModalConfirmDeleteUser from '../Component/Modal/ModalConfirmDelete'; // Import the new modal

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');

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
        toast.error('Error fetching users');
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
      toast.success('User added successfully', {
        position : 'bottom-right'
      });
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Error adding user', {
        position : 'bottom-right'
      });
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
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error editing user:', error);
      toast.error('Error editing user', {
        position : 'bottom-right'
      });
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
      toast.success('User deleted successfully', {
        position : 'bottom-right'
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user', {
        position : 'bottom-right'
      });
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

  const handleSort = () => {
    const sortedUsers = [...users];
    sortedUsers.sort((a, b) => {
      if (a.role < b.role) return sortOrder === 'asc' ? -1 : 1;
      if (a.role > b.role) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setUsers(sortedUsers);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="flex w-full h-full no-scrollbar">
      <Sidebar />
      <div className="flex h-screen w-[85%] p-4">
        <div className="w-full bg-white p-4 rounded shadow">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">User Management</h2>
            <button className="bg-purple hover:bg-lightpurple text-white px-4 py-2 rounded" onClick={() => { setShowModal(true); setIsEditMode(false); }}>Add User</button>
          </div>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray bg-opacity-55">
              <tr>
                <th className="px-4 py-2 border w-20">No</th>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border cursor-pointer" onClick={handleSort}>
                  Role
                  {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                </th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 border w-auto">{index + 1}</td>
                  <td className="px-4 py-2 border text-left">{user.username}</td>
                  <td className="px-4 py-2 border text-left">{user.role}</td>
                  <td className="px-4 py-2 border">
                    <button className="bg-purple hover:bg-midnight text-white px-2 py-1 rounded mr-2" onClick={() => handleEditClick(user)}>Edit</button>
                    <button className="bg-[red] text-white px-2 py-1 rounded" onClick={() => handleDeleteClick(user)}>Delete</button>
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
      <ModalConfirmDeleteUser
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteUser}
        user={selectedUser}
      />
      <ToastContainer />
    </div>
  );
};

export default UserManagement;
