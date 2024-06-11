import { useState, useEffect } from "react";
import axios from "../axiosConfig";
import Sidebar from "../Component/Sidebar"
import { FaExternalLinkAlt } from "react-icons/fa";
import moment from "moment";
import ModalDetails from "../Component/Modal/ModalDetails";
import ModalCreateContent from "../Component/Modal/ModalCreateContent";
import ModalPublish from "../Component/Modal/ModalPublish";
import ig from "../icon/instagram.ico"

const ContentPlan = () => {
  const [konten, setKonten] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false);
  const [showModalPublish, setShowModalPublish] = useState(false);
  const [selectedKontenIndex, setSelectedKontenIndex] = useState(null);
  const [schedule, setSchedule] = useState([]);


  useEffect(() => {
    getKonten();
    getSchedule();
  }, []);

  const getKonten = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjZlNmYwMTNjM2M2MmY0YTAxMjU4NSIsImlhdCI6MTcxODEyMTUzOSwiZXhwIjoxNzE4MjA3OTM5fQ.naaHNPLQH43TaYU5jera63JVV2LPwHDX8e948zLRJp0";
      const response = await axios.get("/konten", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setKonten(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSchedule = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjZlNmYwMTNjM2M2MmY0YTAxMjU4NSIsImlhdCI6MTcxODEyMTUzOSwiZXhwIjoxNzE4MjA3OTM5fQ.naaHNPLQH43TaYU5jera63JVV2LPwHDX8e948zLRJp0";
      const response = await axios.get("/scheduled-contents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSchedule(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (formData) => {
    console.log('Form Data:', formData);

    setShowModalForm(false);
  };

  const handleDetailsClick = (index) => {
    setSelectedKontenIndex(index);
    setShowModal(true);
  };

  const handlePublishClick = (index) => {
    setSelectedKontenIndex(index);
    setShowModalPublish(true);
  };

  const handlePublishConfirm = async () => {
    if (selectedKontenIndex !== null) {
      const kontenItem = konten[selectedKontenIndex];
      // Add your publish logic here. For example, you might want to update the status in the backend
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjZlNmYwMTNjM2M2MmY0YTAxMjU4NSIsImlhdCI6MTcxODEyMTUzOSwiZXhwIjoxNzE4MjA3OTM5fQ.naaHNPLQH43TaYU5jera63JVV2LPwHDX8e948zLRJp0";
        await axios.post(`/scheduled-contents`, { konten_id: kontenItem._id }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Optionally refresh the content list
        getKonten();
      } catch (error) {
        console.error('Error publishing content:', error);
      }
    }
  };

  return (
    <div className="flex w-full h-full no-scrollbar">
      <Sidebar />
      <div className="p-8 w-[85%]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Content Plan</h1>
          <button className="bg-purple text-white px-4 py-2 rounded flex items-center" onClick={() => setShowModalForm(true)}>
            <span className="mr-2">Create</span>
            <FaExternalLinkAlt />
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray">
          <thead>
            <tr className="bg-[#D0D5DD]">
              <th className="px-2 py-2 border">No</th>
              <th className="px-2 py-2 border">Channel</th>
              <th className="px-2 py-2 border">Client</th>
              <th className="px-2 py-2 border">Time</th>
              <th className="px-2 py-2 border">Caption</th>
              <th className="px-2 py-2 border">Visual Type</th>
              <th className="px-2 py-2 border">Media</th>
              <th className="px-2 py-2 border">Status</th>
              <th className="px-2 py-2 border">Details</th>
              <th className="px-2 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {konten.map((item, index) => (
              <tr key={index} className="">
                <td className="px-2 py-2 border">{index + 1}</td>
                <td className="px-2 py-2 border">
                  <div className="flex justify-center w-full">
                    <img className="w-8 h-8" src={ig} />
                  </div>
                </td>
                <td className="px-2 py-2 border">{item.sosmed_id.id_klien.nama}</td>
                <td className="px-2 py-2 border">{item.jadwal && moment(item.jadwal).format('llll')}</td>
                <td className="px-2 py-2 border">{item.caption}</td>
                <td className="px-2 py-2 border">{item.format_konten}</td>
                <td className="px-2 py-2 border text-blue">
                  <a className="text-blue underline" href={item.link_output}>
                    See Media
                  </a>
                </td>
                <td className="px-2 py-2 border">{item.status_upload}</td>
                <td className="px-2 py-2 border text-blue">
                  <button onClick={() => handleDetailsClick(index)}>
                    <p className="underline">Details</p>
                  </button>
                </td>
                <td className="px-2 py-2 border">
                  {item.status_upload !== "scheduled" ? (
                    <button className="bg-purple text-white px-2 py-2 rounded flex justify-center" onClick={() => handlePublishClick(index)}>
                      <p className="mr-2 text-sm text-center">Schedule</p>
                    </button>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ModalDetails showModal={showModal} onClose={() => setShowModal(false)} konten={konten} selectedIndex={selectedKontenIndex} />
        <ModalCreateContent showModal={showModalForm} onClose={() => setShowModalForm(false)} onSubmit={handleFormSubmit} konten={konten} />
        <ModalPublish showModal={showModalPublish} onClose={() => setShowModalPublish(false)} onConfirm={handlePublishConfirm} />
      </div>
    </div>
  );
};

export default ContentPlan;
