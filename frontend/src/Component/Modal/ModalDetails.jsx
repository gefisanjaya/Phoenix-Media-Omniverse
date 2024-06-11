import React, { useState, useEffect } from "react";
import moment from "moment";

const ModalDetails = ({ showModal, onClose, konten, selectedIndex }) => {
    if (!showModal) return null;
  
    const selectedKonten = konten[selectedIndex];
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[45rem]">
          <div className="text-lg font-bold mb-4">Content Details</div>
          <table className="text-left text-wrap mb-4">
            <tbody>
              <tr>
                <td className="font-semibold px-4">Time</td>
                <td>{selectedKonten.jadwal && moment(selectedKonten.jadwal).format('llll')}</td>
              </tr>
              <tr>
                <td className="font-semibold px-4">Client</td>
                <td>{selectedKonten.sosmed_id.id_klien.nama}</td>
              </tr>
              <tr>
                <td className="font-semibold px-4">Platform</td>
                <td>{selectedKonten.sosmed_id.platform}</td>
              </tr>
              <tr>
                <td className="font-semibold px-4">Username</td>
                <td>{selectedKonten.sosmed_id.username}</td>
              </tr>
              <tr>
                <td className="font-semibold px-4">Title</td>
                <td>{selectedKonten.judul}</td>
              </tr>
              <tr>
                <td className="font-semibold px-4">Copy</td>
                <td>{selectedKonten.copy}</td>
              </tr>
              <tr>
                <td className="font-semibold px-4">Caption</td>
                <td>{selectedKonten.caption}</td>
              </tr>
              <tr>
                <td className="font-semibold px-4">Format</td>
                <td>{selectedKonten.format_konten}</td>
              </tr>
              <tr>
                <td className="font-semibold px-4">Status</td>
                <td>{selectedKonten.status_upload}</td>
              </tr>
              <tr>
                <td className="font-semibold mr-10 pl-4">Link Media</td>
                <td><a href={selectedKonten.link_output} className="text-blue underline">Link</a></td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={onClose}
            className="mt-4 bg-purple text-white py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

export default ModalDetails;
