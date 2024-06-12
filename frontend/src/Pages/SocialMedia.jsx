import { useState, useEffect } from "react";
import axios from "../axiosConfig"; // Make sure this points to your axios configuration
import Sidebar from "../Component/Sidebar";
import ig from "../icon/instagram.ico";

const SocialMedia = () => {
  

  return (
    <div className="flex w-full h-full no-scrollbar">
      <Sidebar />
      <div className="flex h-screen w-[85%]">
        
      </div>
    </div>
  );
};

export default SocialMedia;