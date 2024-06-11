import React, { useState, useEffect, useCallback } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "../../axiosConfig";


const ModalCreateContent = ({ showModal, onClose, onSubmit, konten }) => {
    const [formData, setFormData] = useState({
        jadwal: new Date(),
        judul: '',
        status_upload: 'not_uploaded',
        format_konten: '',
        caption: '',
        copy: '',
        link_output: '',
        sosmed_id: null,
    });

    const [usernameOptions, setUsernameOptions] = useState([]);
    useEffect(() => {
        const usernames = konten.map(item => item.sosmed_id.username);
        const uniqueUsernames = [...new Set(usernames)];
        setUsernameOptions(uniqueUsernames);
    }, [konten]);

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

    const handleUsernameChange = useCallback((e) => {
        const selectedUsername = e.target.value;
        const selectedItem = konten.find((item) => item.sosmed_id.username === selectedUsername);
        if (selectedItem) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                sosmed_id: selectedItem.sosmed_id._id,
            }));
        } else {
            console.error(`No item found with username ${selectedUsername}`);
        }
    }, [konten]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjZlNmYwMTNjM2M2MmY0YTAxMjU4NSIsImlhdCI6MTcxODAyNjExNCwiZXhwIjoxNzE4MTEyNTE0fQ._jXpRjU3XZe69IHMh4JBd3AdSDoCFxlLaIT85hxhuvk";
        const formDataToSend = {
            jadwal: formData.jadwal,
            judul: formData.judul,
            status_upload: formData.status_upload,
            format_konten: formData.format_konten,
            caption: formData.caption,
            copy: formData.copy,
            link_output: formData.link_output,
            sosmed_id: formData.sosmed_id,
        };

        try {
            const response = await axios.post("/konten", formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

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
                                    name="username"
                                    value={formData.username}
                                    onChange={handleUsernameChange}
                                    className="w-full px-3 py-2 border rounded"
                                >
                                    <option value="">Select Account</option>
                                    {usernameOptions.map((username, index) => (
                                        <option key={index} value={username}>{username}</option>
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