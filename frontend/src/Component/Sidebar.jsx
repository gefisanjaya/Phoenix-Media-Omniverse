import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaClipboardList, FaTasks, FaUser, FaSignOutAlt } from 'react-icons/fa';
import logo from '../icon/icon_logo.ico';
import { CgProfile } from 'react-icons/cg';
import { IoSettings, IoShareSocial } from "react-icons/io5";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === '/dashboard';
  const isContentPlan = location.pathname === '/contentplan';
  const isTask = location.pathname === '/task';
  const isClient = location.pathname === '/client';
  const isUserManagement = location.pathname === '/usermanagement';
  const isSocialMedia = location.pathname === '/socialmedia'

  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedOut(true);
    navigate('/');
  };

  return (
    <div className="h-screen bg-purple text-white flex flex-col justify-between w-[15%]">
      <div className="flex flex-col">
        <div className="flex flex-row py-3 mt-4 mx-auto">
          <img src={logo} alt="Phoenix Media Omniverse" className="w-12 mb-2 mr-3" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold tracking-widest">PHOENIX</h1>
            <h2 className="text-sm">MEDIA OMNIVERSE</h2>
          </div>
        </div>
        <nav className="mt-8 ml-5">
          <ul className="space-y-9 items-start">
            {['admin', 'content_planner', 'designer', 'videographer'].includes(userRole) && (
              <li className="flex items-center space-x-2">
                {isDashboard ? (
                  <div className="flex bg-white rounded-l p-2 items-center text-purple w-full">
                    <FaTachometerAlt />
                    <span className="ml-2">Dashboard</span>
                  </div>
                ) : (
                  <a href="/dashboard" className="flex items-center">
                    <FaTachometerAlt />
                    <span className="ml-2">Dashboard</span>
                  </a>
                )}
              </li>
            )}
            {userRole === 'admin' && (
              <li className="flex items-center space-x-2">
                {isUserManagement ? (
                  <div className="flex bg-white rounded-l p-2 items-center text-purple w-full">
                    <IoSettings />
                    <span className="ml-2">User Management</span>
                  </div>
                ) : (
                  <a href="/usermanagement" className="flex items-center">
                    <IoSettings />
                    <span className="ml-2">User Management</span>
                  </a>
                )}
              </li>
            )}
            {userRole === 'content_planner' && (
              <li className="flex items-center space-x-2">
                {isContentPlan ? (
                  <div className="flex bg-white rounded-l p-2 items-center text-purple w-full">
                    <FaClipboardList />
                    <span className="ml-2">Content Plan</span>
                  </div>
                ) : (
                  <a href="/contentplan" className="flex items-center">
                    <FaClipboardList />
                    <span className="ml-2">Content Plan</span>
                  </a>
                )}
              </li>
            )}
            {['content_planner', 'designer', 'videographer'].includes(userRole) && (
              <li className="flex items-center space-x-2">
                {isTask ? (
                  <div className="flex bg-white rounded-l p-2 items-center text-purple w-full">
                    <FaTasks />
                    <span className="ml-2">Task</span>
                  </div>
                ) : (
                  <a href="/task" className="flex items-center">
                    <FaTasks />
                    <span className="ml-2">Task</span>
                  </a>
                )}
              </li>
            )}
            {userRole === 'admin' && (
              <li className="flex items-center space-x-2">
                {isClient ? (
                  <div className="flex bg-white rounded-l p-2 items-center text-purple w-full">
                    <FaUser />
                    <span className="ml-2">Client</span>
                  </div>
                ) : (
                  <a href="/client" className="flex items-center">
                    <FaUser />
                    <span className="ml-2">Client</span>
                  </a>
                )}
              </li>
            )}
            {userRole === 'admin' && (
              <li className="flex items-center space-x-2">
                {isSocialMedia ? (
                  <div className="flex bg-white rounded-l p-2 items-center text-purple w-full">
                    <IoShareSocial />
                    <span className="ml-2">Social Media</span>
                  </div>
                ) : (
                  <a href="/socialmedia" className="flex items-center">
                    <IoShareSocial />
                    <span className="ml-2">Social Media</span>
                  </a>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="flex flex-col mb-4">
        <li className="flex items-center space-x-2 mt-8 ml-5">
          <CgProfile className="w-8 h-8" />
          <span>{userRole}</span>
        </li>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-[90%] mt-8 mx-auto space-x-2 text-black bg-white hover:bg-lightpurple px-4 py-2 rounded"
        >
          <FaSignOutAlt />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;