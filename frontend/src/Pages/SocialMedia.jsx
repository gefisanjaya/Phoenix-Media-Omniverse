import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig'; // Adjust the path as necessary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Component/Sidebar';
import ModalAddSocialMedia from '../Component/Modal/ModalAddSocialMedia';
import ModalConfirmDeleteSocialMedia from '../Component/Modal/ModalConfirmDeleteSocialMedia';

const SocialMediaManagement = () => {
  const [socialMedias, setSocialMedias] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchSocialMedias = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/social-media', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSocialMedias(response.data);
      } catch (error) {
        console.error('Error fetching social media accounts:', error);
      }
    };

    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/klien', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchSocialMedias();
    fetchClients();
  }, []);

  const handleAddSocialMedia = async (socialMedia) => {
    try {
      const token = localStorage.getItem('token');
      if (socialMedia._id) {
        await axios.put(`/social-media/${socialMedia._id}`, socialMedia, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSocialMedias(socialMedias.map(sm => (sm._id === socialMedia._id ? socialMedia : sm)));
        toast.success('Social media account updated successfully.', {
          position: "bottom-right"
        });
      } else {
        const response = await axios.post('/social-media', socialMedia, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSocialMedias([...socialMedias, response.data]);
        toast.success('Social media account added successfully.', {
          position: "bottom-right"
        });
      }
      setShowModal(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error adding/updating social media account:', error);
      toast.error('An error occurred. Please try again.' , {
        position: "bottom-right"
      });
    }
  };

  const handleDeleteSocialMedia = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/social-media/${selectedSocialMedia._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSocialMedias(socialMedias.filter(sm => sm._id !== selectedSocialMedia._id));
      setShowDeleteModal(false);
      setSelectedSocialMedia(null);
      toast.success('Social media account deleted successfully.', {
        position: "bottom-right"
      });
    } catch (error) {
      console.error('Error deleting social media account:', error);
      toast.error('An error occurred. Please try again.', {
        position: "bottom-right"
      });
    }
  };

  const handleDeleteClick = (socialMedia) => {
    setSelectedSocialMedia(socialMedia);
    setShowDeleteModal(true);
  };

  const handleEditClick = (socialMedia) => {
    setSelectedSocialMedia(socialMedia);
    setShowModal(true);
    setIsEditMode(true);
  };

  return (
    <div className="flex w-full h-full no-scrollbar">
      <Sidebar />
      <div className="flex h-screen w-[85%] p-4">
        <div className="w-full bg-white p-4 rounded shadow">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">Social Media Management</h2>
            <button className="bg-purple hover:bg-lightpurple text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>Add Social Media</button>
          </div>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray bg-opacity-55">
              <tr>
                <th className="px-4 py-2 border w-20">No</th>
                <th className="px-4 py-2 border">Client</th>
                <th className="px-4 py-2 border">Platform</th>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray">
              {socialMedias.map((socialMedia, index) => (
                <tr key={socialMedia._id}>
                  <td className="px-4 py-2 border w-auto">{index + 1}</td>
                  <td className="px-4 py-2 border text-left">{socialMedia.id_klien.nama}</td>
                  <td className="px-4 py-2 border text-left">{socialMedia.platform}</td>
                  <td className="px-4 py-2 border text-left">{socialMedia.username}</td>
                  <td className="px-4 py-2 border">
                    <button className="bg-purple hover:bg-[blue] text-white px-2 py-1 rounded" onClick={() => handleEditClick(socialMedia)}>Edit</button>
                    <button className="bg-[red] hover:bg-[red] text-white px-2 py-1 rounded ml-2" onClick={() => handleDeleteClick(socialMedia)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalAddSocialMedia
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setIsEditMode(false);
        }}
        onSubmit={handleAddSocialMedia}
        clients={clients} // Pass clients to ModalAddSocialMedia
        socialMedia={isEditMode ? selectedSocialMedia : null}
      />
      <ModalConfirmDeleteSocialMedia
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteSocialMedia}
        socialMedia={selectedSocialMedia}
      />
      <ToastContainer />
    </div>
  );
};

export default SocialMediaManagement;
