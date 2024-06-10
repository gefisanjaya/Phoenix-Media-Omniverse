import { useState, useEffect } from "react";
import axios from "../axiosConfig";
import Sidebar from "../Component/Sidebar"
import {FaExternalLinkAlt } from "react-icons/fa";
import moment from "moment";
import ig from "../icon/instagram.ico"

const ContentPlan = () => {
  const [konten, setKonten] = useState([]);

  useEffect(() => {
    getKonten();
  }, []);

  const getKonten = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjZlNmYwMTNjM2M2MmY0YTAxMjU4NSIsImlhdCI6MTcxODAyNjExNCwiZXhwIjoxNzE4MTEyNTE0fQ._jXpRjU3XZe69IHMh4JBd3AdSDoCFxlLaIT85hxhuvk";
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

  return (
    <div className="flex w-full h-full no-scrollbar">
      <Sidebar />
      <div className="p-8 w-[85%]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Content Plan</h1>
          <button className="bg-purple text-white px-4 py-2 rounded flex items-center">
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
              <th className="px-2 py-2 border">Caption/Copy</th>
              <th className="px-2 py-2 border">Visual Type</th>
              <th className="px-2 py-2 border">Media</th>
              <th className="px-2 py-2 border">Status</th>
              <th className="px-2 py-2 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {konten.map((item, index) => (
              <tr key={index} className="">
                <td className="px-2 py-2 border">{index + 1}</td>
                <td className="px-2 py-2 border">{item.sosmed_id.platform}</td>
                <td className="px-2 py-2 border">{item.sosmed_id.id_klien.nama}</td>
                <td className="px-2 py-2 border">{item.jadwal && moment(item.jadwal).format('llll')}</td>
                <td className="px-2 py-2 border">{item.caption}</td>
                <td className="px-2 py-2 border">{item.format_konten}</td>
                <td className="px-2 py-2 border text-blue">
                  <a className="text-blue" href={item.link_output}>
                    See Media
                  </a>
                </td>
                <td className="px-2 py-2 border text-blue">{item.status_upload}</td>
                <td className="px-2 py-2 border text-blue">{item.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentPlan;
