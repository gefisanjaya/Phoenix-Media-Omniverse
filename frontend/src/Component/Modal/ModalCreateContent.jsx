import React, { useState, useEffect, useCallback } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "../../axiosConfig";
import { addHours } from 'date-fns';

const ModalCreateContent = ({ showModal, onClose, onSubmit, socialMedias }) => {
    const [formData, setFormData] = useState({
        jadwal: new Date(),
        judul: '',
        status_upload: 'not_uploaded',
        format_konten: '',
        caption: '',
        copy: '',
        link_output: '',
        sosmed_id: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            jadwal: date,
        });
    };

    const handleUsernameChange = (e) => {
        const selectedId = e.target.value;
        setFormData({
            ...formData,
            sosmed_id: selectedId,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const adjustedJadwal = addHours(formData.jadwal, 7);
        const formDataToSend = {
            ...formData,
            jadwal: adjustedJadwal,
        };

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("/konten", formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            window.location.reload();
            console.log(response.data);
            onSubmit(formDataToSend); // Call the onSubmit function with the submitted data
        } catch (error) {
            console.error(error);
            // Handle error response
        }
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[30rem]">
                <div className="text-lg font-bold mb-4">Add Content</div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <div className="flex">
                            <div className="w-1/2 pr-2">
                                <label className="block text-gray-700">Account</label>
                                <select
                                    name="sosmed_id"
                                    value={formData.sosmed_id}
                                    onChange={handleUsernameChange}
                                    className="w-full px-3 py-2 border rounded"
                                >
                                    <option value="">Select Account</option>
                                    {socialMedias.map((socialMedia) => (
                                        <option key={socialMedia._id} value={socialMedia._id}>
                                            {socialMedia.username}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-1/2 pl-2">
                                <label className="block text-gray-700">Schedule Date</label>
                                <DatePicker
                                    selected={formData.jadwal}
                                    onChange={handleDateChange}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex mb-4">
                        <div className="w-1/2 pr-2">
                            <label className="block text-gray-700">Title</label>
                            <input
                                type="text"
                                name="judul"
                                value={formData.judul}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="w-1/2 pl-2">
                            <label className="block text-gray-700">Format</label>
                            <input
                                type="text"
                                name="format_konten"
                                value={formData.format_konten}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Caption</label>
                        <textarea
                            name="caption"
                            value={formData.caption}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Copy</label>
                        <textarea
                            name="copy"
                            value={formData.copy}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Link Output</label>
                        <input
                            type="text"
                            name="link_output"
                            value={formData.link_output}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-4 bg-gray text-white py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-purple text-white py-2 px-4 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCreateContent;
