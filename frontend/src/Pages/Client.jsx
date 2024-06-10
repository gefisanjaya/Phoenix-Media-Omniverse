import { useState } from "react";
import Sidebar from "../Component/Sidebar"
import { AiFillTikTok } from "react-icons/ai";
import { FaSquareInstagram } from "react-icons/fa6";
import moment from "moment";

const Client = () => {

  return (
    <div className="flex w-full h-full no-scrollbar">
      <Sidebar />
      <div className="flex h-screen w-[85%]">
        <div className="w-1/4 bg-white p-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 mb-4 border rounded"
          />
          <ul>
            {[
              'Pempek Bandung',
              'Herbalis Food',
              'Dadang Floris',
              'Apotik Alya',
              'Ramen Sujuran',
              'Deddy Barber',
              'Kopi Ipok',
            ].map((client, index) => (
              <li
                key={index}
                className={`flex items-center p-2 mb-2 rounded cursor-pointer ${index === 0 ? 'bg-lightpurple bg-opacity-50' : ''
                  }`}
              >
                <img
                  src="https://via.placeholder.com/40"
                  alt="avatar"
                  className="w-10 h-10 mr-2 rounded-full"
                />
                <span>{client}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white p-8">
          <h2 className="text-2xl font-bold text-left mb-5">Client Details</h2>
          <div className="flex items-center mb-6">
            <img
              src="https://via.placeholder.com/80"
              alt="avatar"
              className="w-18 h-18 mr-4 rounded-full"
            />
            <div className="text-left">
              <h1 className="text-xl font-semibold">Pempek Bandung</h1>
              <p className="text-gray-600">UMKM</p>
            </div>
            <div className="ml-auto flex space-x-4">
              <a href="#" aria-label="Instagram">
                <FaSquareInstagram className="w-8 h-8"/>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 text-left font-semibold">
            <div>
              <h2 className="text-lg text-gray">Address</h2>
              <p>Jalan Burarang No.61, Kota Bandung, Jawa Barat, Indonesia</p>
            </div>
            <div>
              <h2 className="text-lg text-gray">Contact</h2>
              <p>+62 123 456 789</p>
              <p>pempekbdg@gmail.com</p>
            </div>
          </div>
          <div className="mt-6 text-left font-semibold">
            <h2 className="text-lg text-gray">Description</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              bibendum hendrerit lobortis. Nullam ut lacus eros. Sed at luctus
              urna, eu fermentum diam. In et tristique mauris.
            </p>
            <p className="mt-2 text-gray-700">
              Ut id ornare metus, sed auctor enim. Pellentesque nisi magna,
              laoreet a augue eget, tempor volutpat diam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
