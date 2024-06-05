import { useState } from "react";
import Sidebar from "../Component/Sidebar"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import moment from "moment";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const generateCalendar = () => {
    const firstDay = (new Date(
      currentDate.getFullYear(),
      currentDate.getMonth()
    ).getDay() + 6) %
      7;
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const days = [];
    

    // Add empty days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    );
  };

  const formattedDate = (date) => {
    return `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`;
  };

  const days = generateCalendar();

  return (
    <div className="flex w-full no-scrollbar">
      <Sidebar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold py-3 mb-3 text-left">
          Hello, Content Planner!
        </h1>
        <div className="flex">
          <div className="container mr-3">
            <div className="flex">
              <div className="flex justify-between mb-4 w-full">
                <h2 className="text-xl font-semibold mb-4">
                  Phoenix Event Calendar
                </h2>
                <div className="flex justify-between mb-4">
                  <button onClick={handlePreviousMonth} className="px-4 py-2 rounded bg-gray-200">
                    <FaArrowLeft/>
                  </button>
                  <span className="font-semibold text-lg">
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </span>
                  <button onClick={handleNextMonth} className="px-4 py-2 rounded bg-gray-200">
                    <FaArrowRight/>
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-7 text-center">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="bg-[#6561AC] bg-opacity-50 p-2">
                  {day}
                </div>
              ))}
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`relative py-10 p-2  ${moment().date() === day ? "bg-[#6561AC] bg-opacity-50 border text-black" : ""
                    }`}
                  onClick={() => handleDateClick(day)}
                >
                  <div className="absolute top-0 right-1">
                    {day}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="ml-2 mt-8 w-1/3">
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <h3 className="text-lg font-semibold mb-2">Nearest Activity</h3>
              <ul>
                <li className="mb-1 text-left">
                  Due Date Video #12{" "}
                  <span className="text-gray-500 font-light float-right">Today</span>
                </li>
                <li className="mb-1 text-left">
                  Due Date Graphic #12{" "}
                  <span className="text-gray-500 font-light float-right">Today</span>
                </li>
                <li className="mb-1 text-left">
                  Client Meeting #13{" "}
                  <span className="text-gray-500 font-light float-right">Tomorrow</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 bg-gray-100 p-4 rounded shadow-md">
              <h3 className="text-lg font-bold mb-2">To Do</h3>
              <ul>
                <li className="mb-1 text-left">
                  Scheduled Posts <span className="float-right">4</span>
                </li>
                <li className="mb-1 text-left">
                  Published Posts <span className="float-right">2</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 bg-gray-100 p-4 rounded shadow-md">
              <h3 className="text-lg font-bold mb-2">Today's Activity</h3>
              <ul>
                <li className="mb-1 text-left">
                  Scheduled Posts <span className="float-right">4</span>
                </li>
                <li className="mb-1 text-left">
                  Published Posts <span className="float-right">2</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
