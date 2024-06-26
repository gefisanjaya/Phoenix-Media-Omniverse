import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import Sidebar from "../Component/Sidebar";
import { FaExternalLinkAlt, FaEdit, FaTrash } from "react-icons/fa";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx"; // Correct import for xlsx
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalDetails from "../Component/Modal/ModalDetails";
import ModalCreateContent from "../Component/Modal/ModalCreateContent";
import ModalExport from "../Component/Modal/ModalExport";
import ModalConfirmDeleteContent from "../Component/Modal/ModalConfirmDeleteContent"; // Import the new modal
import ig from "../icon/instagram.ico";
import ModalSchedule from "../Component/Modal/ModalSchedule";

const ContentPlan = () => {
  const [konten, setKonten] = useState([]);
  const [socialMedias, setSocialMedias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false);
  const [showModalSchedule, setShowModalSchedule] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedKontenIndex, setSelectedKontenIndex] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    getKonten();
    getSocialMedias();
  }, []);

  const getKonten = async () => {
    try {
      const token = localStorage.getItem("token");
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

  const getSocialMedias = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/social-media", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSocialMedias(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      if (isEditMode) {
        await axios.put(`/konten/${konten[selectedKontenIndex]._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Content updated successfully");
      } else {
        await axios.post("/konten", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Content created successfully" , {
          position : 'bottom-right'
        });
      }
      setShowModalForm(false);
      getKonten();
    } catch (error) {
      console.error(error);
      toast.error("Error saving content" , {
        position : 'bottom-right'
      });
    }
  };

  const handleDeleteContent = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/konten/${konten[selectedKontenIndex]._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Content deleted successfully", {
        position : 'bottom-right'
      });
      setShowDeleteModal(false);
      getKonten();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting content" , {
        position : 'bottom-right'
      });
    }
  };

  const handleDetailsClick = (index) => {
    setSelectedKontenIndex(index);
    setShowModal(true);
  };

  const handleScheduleClick = (index) => {
    setSelectedKontenIndex(index);
    setShowModalSchedule(true);
  };

  const handleScheduleConfirm = async () => {
    if (selectedKontenIndex !== null) {
      const kontenItem = konten[selectedKontenIndex];
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          `/scheduled-contents`,
          { konten_id: kontenItem._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        getKonten();
      } catch (error) {
        console.error("Error scheduling content:", error);
      }
    }
  };

  const handleExport = async (options) => {
    const { range, client, format } = options;

    let filteredKonten = konten;

    if (range === "this_week") {
      const startOfWeek = moment().startOf("week");
      const endOfWeek = moment().endOf("week");
      filteredKonten = filteredKonten.filter((item) =>
        moment(item.jadwal).isBetween(startOfWeek, endOfWeek)
      );
    } else if (range === "this_month") {
      const startOfMonth = moment().startOf("month");
      const endOfMonth = moment().endOf("month");
      filteredKonten = filteredKonten.filter((item) =>
        moment(item.jadwal).isBetween(startOfMonth, endOfMonth)
      );
    }

    if (client !== "all_clients") {
      filteredKonten = filteredKonten.filter(
        (item) => item.sosmed_id.id_klien.nama === client
      );
    }

    if (format === "pdf") {
      const doc = new jsPDF();
      doc.text("Content Plan", 14, 16);
      doc.autoTable({
        head: [
          [
            "No",
            "Channel",
            "Client",
            "Time",
            "Caption",
            "Visual Type",
            "Status",
          ],
        ],
        body: filteredKonten.map((item, index) => [
          index + 1,
          "Instagram",
          item.sosmed_id.id_klien.nama,
          moment(item.jadwal).utcOffset(0).format("llll"),
          item.caption,
          item.format_konten,
          item.status_upload,
        ]),
      });
      doc.save("content_plan.pdf");
    } else if (format === "excel") {
      const worksheet = XLSX.utils.json_to_sheet(
        filteredKonten.map((item, index) => ({
          No: index + 1,
          Channel: "Instagram",
          Client: item.sosmed_id.id_klien.nama,
          Time: moment(item.jadwal).utcOffset(0).format("llll"),
          Caption: item.caption,
          Visual_Type: item.format_konten,
          Status: item.status_upload,
        }))
      );
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Content Plan");
      XLSX.writeFile(workbook, "content_plan.xlsx");
    }

    setShowExportModal(false);
  };

  const uniqueClients = [
    ...new Set(konten.map((item) => item.sosmed_id.id_klien.nama)),
  ];

  const handleEditClick = (index) => {
    setSelectedKontenIndex(index);
    setIsEditMode(true);
    setShowModalForm(true);
  };

  const handleDeleteClick = (index) => {
    setSelectedKontenIndex(index);
    setShowDeleteModal(true);
  };

  return (
    <div className="flex w-full h-full no-scrollbar">
      <Sidebar />
      <div className="p-8 w-[85%]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Content Plan</h1>
          <div className="flex space-x-4">
            <button
              className="bg-purple text-white px-4 py-2 rounded flex items-center"
              onClick={() => { setShowModalForm(true); setIsEditMode(false); }}
            >
              <span className="mr-2">Create</span>
              <FaExternalLinkAlt />
            </button>
            <button
              className="bg-purple text-white px-4 py-2 rounded flex items-center"
              onClick={() => setShowExportModal(true)}
            >
              <span className="mr-2">Export</span>
              <FaExternalLinkAlt />
            </button>
          </div>
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
                <td className="px-2 py-2 border">
                  {item.sosmed_id.id_klien.nama}
                </td>
                <td className="px-2 py-2 border">
                  {item.jadwal &&
                    moment(item.jadwal).utcOffset(0).format("llll")}
                </td>
                <td className="px-2 py-2 border">{item.caption}</td>
                <td className="px-2 py-2 border">{item.format_konten}</td>
                <td className="px-2 py-2 border text-blue">
                  <a className="text-blue underline" href={item.link_output}>
                    See Media
                  </a>
                </td>
                {item.status_upload === "not_uploaded" ? (
                  <td className="px-2 py-2 border bg-[gray] bg-opacity-55">
                    Not Uploaded
                  </td>
                ) : item.status_upload === "scheduled" ? (
                  <td className="px-2 py-2 border bg-[yellow]">
                    Scheduled
                  </td>
                ) : (
                  <td className="px-2 py-2 border bg-[green]">
                    Uploaded
                  </td>
                )}

                <td className="px-2 py-2 border text-blue">
                  <button onClick={() => handleDetailsClick(index)}>
                    <p className="underline">Details</p>
                  </button>
                </td>
                <td className="px-2 py-2 flex justify-center items-center">
                  {item.status_upload === "not_uploaded" ? (
                    <>
                      <button
                        className="bg-purple text-white px-2 py-2 rounded flex justify-center"
                        onClick={() => handleScheduleClick(index)}
                      >
                        <p className="text-sm text-center">Schedule</p>
                      </button>
                      <button
                        className="bg-purple text-white rounded flex items-center justify-center ml-2 h-8 w-8"
                        onClick={() => handleEditClick(index)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-[red] text-white rounded flex items-center justify-center ml-2 h-8 w-8"
                        onClick={() => handleDeleteClick(index)}
                      >
                        <FaTrash />
                      </button>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ModalDetails
          showModal={showModal}
          onClose={() => setShowModal(false)}
          konten={konten}
          selectedIndex={selectedKontenIndex}
        />
        <ModalCreateContent
          showModal={showModalForm}
          onClose={() => setShowModalForm(false)}
          onSubmit={handleFormSubmit}
          socialMedias={socialMedias}
          initialData={isEditMode ? konten[selectedKontenIndex] : null}
        />
        <ModalSchedule
          showModal={showModalSchedule}
          onClose={() => setShowModalSchedule(false)}
          onConfirm={handleScheduleConfirm}
        />
        <ModalExport
          showModal={showExportModal}
          onClose={() => setShowExportModal(false)}
          onConfirm={handleExport}
          clients={uniqueClients}
        />
        <ModalConfirmDeleteContent
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteContent}
          content={konten[selectedKontenIndex]}
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default ContentPlan;
