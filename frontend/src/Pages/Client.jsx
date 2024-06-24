import { useState, useEffect } from "react";
import axios from "../axiosConfig"; // Make sure this points to your axios configuration
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Component/Sidebar";
import ModalAddClient from "../Component/Modal/ModalAddClient";
import ModalConfirmDeleteClient from "../Component/Modal/ModalConfirmDeleteClient"; // Import the new modal

const Client = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/klien", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(response.data);
        setSelectedClient(response.data[0]); // Select the first client by default
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleAddClient = async (client) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/klien", client, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients([...clients, response.data]);
      setShowModal(false);
      toast.success("Client added successfully!");
    } catch (error) {
      console.error("Error adding client:", error);
      toast.error("Error adding client. Please try again.");
    }
  };

  const handleEditClient = async (client) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/klien/${selectedClient._id}`, client, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(clients.map(c => (c._id === selectedClient._id ? { ...c, ...client } : c)));
      setShowModal(false);
      toast.success("Client updated successfully!");
    } catch (error) {
      console.error("Error updating client:", error);
      toast.error("Error updating client. Please try again.");
    }
  };

  const handleDeleteClient = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/klien/${selectedClient._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(clients.filter(client => client._id !== selectedClient._id));
      setShowDeleteModal(false);
      setSelectedClient(null);
      toast.success("Client deleted successfully!");
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error("Error deleting client. Please try again.");
    }
  };

  const filteredClients = clients.filter(client =>
    client.nama.toLowerCase().includes(search.toLowerCase())
  );

  const handleModalSubmit = (client) => {
    if (isEditMode) {
      handleEditClient(client);
    } else {
      handleAddClient(client);
    }
  };

  return (
    <div className="flex w-full h-full no-scrollbar">
      <Sidebar />
      <div className="flex h-screen w-[85%]">
        <div className="w-1/4 bg-white p-4">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <ul>
            <button className="bg-purple text-white px-4 py-2 mb-2 rounded flex items-center justify-center w-full" onClick={() => { setShowModal(true); setIsEditMode(false); }}>
              <span className="mr-2 text-center">Add Client</span>
            </button>
            {filteredClients.map((client, index) => (
              <li
                key={client._id}
                onClick={() => handleClientClick(client)}
                className={`flex items-center p-2 mb-2 rounded cursor-pointer ${selectedClient && selectedClient._id === client._id ? 'bg-lightpurple bg-opacity-50' : ''
                  }`}
              >
                <img
                  src={client.avatar || "https://via.placeholder.com/40"}
                  alt="avatar"
                  className="w-10 h-10 mr-2 rounded-full"
                />
                <span>{client.nama}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white p-8">
          {selectedClient ? (
            <>
              <h2 className="text-2xl font-bold text-left mb-5">Client Details</h2>
              <div className="flex items-center mb-6">
                <img
                  src={selectedClient.avatar || "https://via.placeholder.com/80"}
                  alt="avatar"
                  className="w-18 h-18 mr-4 rounded-full"
                />
                <div className="text-left">
                  <h1 className="text-xl font-semibold">{selectedClient.nama}</h1>
                  <p className="text-gray-600">{selectedClient.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 text-left font-semibold">
                <div>
                  <h2 className="text-lg text-gray">Address</h2>
                  <p>{selectedClient.alamat}</p>
                </div>
                <div>
                  <h2 className="text-lg text-gray">Contact</h2>
                  <p>{selectedClient.kontak}</p>
                  <p>{selectedClient.email}</p>
                </div>
              </div>
              <div className="mt-6 text-left font-semibold">
                <h2 className="text-lg text-gray">Description</h2>
                <p className="text-gray-700">{selectedClient.deskripsi}</p>
              </div>
              <div className="w-full flex">
                <button
                  className="mt-10 px-4 py-2 bg-purple text-white rounded mr-2"
                  onClick={() => { setShowModal(true); setIsEditMode(true); }}
                >
                  Edit Client
                </button>
                <button
                  className="mt-10 px-4 py-2 bg-[red] text-white rounded"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Client
                </button>
              </div>
            </>
          ) : (
            <p>Select a client to see the details</p>
          )}
        </div>
      </div>
      <ModalAddClient
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleModalSubmit}
        client={isEditMode ? selectedClient : null}
      />
      <ModalConfirmDeleteClient
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteClient}
        client={selectedClient}
      />
      <ToastContainer />
    </div>
  );
};

export default Client;
