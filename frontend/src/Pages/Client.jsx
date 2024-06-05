import { useState } from "react";
import Sidebar from "../Component/Sidebar"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import moment from "moment";

const Client = () => {

  return (
    <div className="flex w-full h-full no-scrollbar">
      <Sidebar />
    </div>
  );
};

export default Client;
