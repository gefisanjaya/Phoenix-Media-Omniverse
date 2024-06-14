import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig'; // Adjust the path as necessary
import Sidebar from '../Component/Sidebar';
import ModalAddSocialMedia from '../Component/Modal/ModalAddSocialMedia';
import ModalConfirmDeleteSocialMedia from '../Component/Modal/ModalConfirmDeleteSocialMedia';

const SocialMediaManagement = () => {
  const [socialMedias, setSocialMedias] = useState([]);
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

    fetchSocialMedias();
  }, []);

  const handleAddSocialMedia = async (socialMedia) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/social-media', socialMedia, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSocialMedias([...socialMedias, response.data]);
      setShowModal(false);
    } catch (error) {
      console.error('Error adding social media account:', error);
    }
  };

  const handleEditSocialMedia = async (socialMedia) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`/social-media/${selectedSocialMedia._id}`, socialMedia, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSocialMedias(socialMedias.map(sm => (sm._id === selectedSocialMedia._id ? response.data : sm)));
      setShowModal(false);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error editing social media account:', error);
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
    } catch (error) {
      console.error('Error deleting social media account:', error);
    }
  };

  const handleEditClick = (socialMedia) => {
    setSelectedSocialMedia(socialMedia);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDeleteClick = (socialMedia) => {
    setSelectedSocialMedia(socialMedia);
    setShowDeleteModal(true);
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
            <tbody className="bg-white divide-y divide-gray-200">
              {socialMedias.map((socialMedia, index) => (
                <tr key={socialMedia._id}>
                  <td className="px-4 py-2 border w-auto">{index + 1}</td>
                  <td className="px-4 py-2 border text-left">{socialMedia.id_klien.nama}</td>
                  <td className="px-4 py-2 border text-left">{socialMedia.platform}</td>
                  <td className="px-4 py-2 border text-left">{socialMedia.username}</td>
                  <td className="px-4 py-2 border">
                    <button className="bg-[red] hover:bg-[red] text-white px-2 py-1 rounded" onClick={() => handleDeleteClick(socialMedia)}>Delete</button>
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
        onSubmit={isEditMode ? handleEditSocialMedia : handleAddSocialMedia}
        initialData={selectedSocialMedia}
        socialMedias={socialMedias} // Pass socialMedias to ModalAddSocialMedia
      />
      <ModalConfirmDeleteSocialMedia
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteSocialMedia}
        socialMedia={selectedSocialMedia}
      />
    </div>
  );
};

export default SocialMediaManagement;
