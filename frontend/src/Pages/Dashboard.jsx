import { useState, useEffect } from "react";
import Sidebar from "../Component/Sidebar";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import moment from "moment";
import axios from "../axiosConfig"; // Adjust the path as necessary
import ModalEventDetails from "../Component/Modal/ModalEventDetails";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [contents, setContents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const fetchContents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/konten", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContents(response.data);
      } catch (error) {
        console.error("Error fetching contents:", error);
      }
    };

    fetchTasks();
    fetchContents();
  }, []);

  const generateCalendar = () => {
    const firstDay = (new Date(currentDate.getFullYear(), currentDate.getMonth()).getDay() + 6) % 7;
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
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
    const events = getDayEvents(day);
    setSelectedEvents(events);
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    setShowModal(true);
  };

  const getDayEvents = (day) => {
    const dayStart = moment.utc([currentDate.getFullYear(), currentDate.getMonth(), day]);
    const dayEnd = dayStart.clone().add(1, 'day');

    const dayTasks = tasks.filter(task => {
      const taskDate = moment.utc(task.tenggat_waktu);
      return taskDate.isBetween(dayStart, dayEnd, null, '[)');
    });

    const dayContents = contents.filter(content => {
      const contentDate = moment.utc(content.jadwal);
      return contentDate.isBetween(dayStart, dayEnd, null, '[)');
    });

    return [...dayTasks, ...dayContents];
  };

  const getNearestActivities = () => {
    const today = moment.utc();
    const upcomingTasks = tasks.filter(task => moment.utc(task.tenggat_waktu).isSameOrAfter(today));
    const upcomingContents = contents.filter(content => moment.utc(content.jadwal).isSameOrAfter(today));

    const allUpcomingEvents = [...upcomingTasks, ...upcomingContents].sort(
      (a, b) => moment.utc(a.tenggat_waktu || a.jadwal) - moment.utc(b.tenggat_waktu || b.jadwal)
    );

    return allUpcomingEvents.slice(0, 5); // Adjust the number of nearest activities to display
  };

  const countScheduledPosts = contents.filter(content => content.status_upload === 'scheduled').length;
  const countNotUploadedPosts = contents.filter(content => content.status_upload === 'not_uploaded').length;
  const countUploadedPosts = contents.filter(content => content.status_upload === 'uploaded').length;

  const days = generateCalendar();

  return (
    <div className="flex w-full no-scrollbar">
      <Sidebar />
      <div className="container mx-auto p-4 w-[85%]">
        <h1 className="text-2xl font-bold py-3 mb-3 text-left">Hello, Content Planner!</h1>
        <div className="flex">
          <div className="container mr-3">
            <div className="flex">
              <div className="flex justify-between mb-4 w-full">
                <h2 className="text-xl font-semibold mb-4">Phoenix Event Calendar</h2>
                <div className="flex justify-between mb-4">
                  <button onClick={handlePreviousMonth} className="px-4 py-2 rounded bg-gray-200">
                    <FaArrowLeft />
                  </button>
                  <span className="font-semibold text-lg">
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </span>
                  <button onClick={handleNextMonth} className="px-4 py-2 rounded bg-gray-200">
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-7 text-center">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="bg-[#6561AC] bg-opacity-50 p-2">{day}</div>
              ))}
              {days.map((day, index) => {
                const isToday = moment.utc().isSame(moment.utc([currentDate.getFullYear(), currentDate.getMonth(), day]), 'day');
                return (
                  <div
                    key={index}
                    className={`relative w-50 h-[100px] p-2 border border-gray border-opacity-30 ${isToday ? "bg-lightpurple bg-opacity-50 border text-black" : ""}`}
                    onClick={() => handleDateClick(day)}
                  >
                    <div className="absolute top-1 right-1">{day}</div>
                    <div className="mt-4 overflow-auto h-full">
                      {day && getDayEvents(day).slice(0, 3).map((event, idx) => (
                        <div key={idx} className={`text-[0.5rem] font-semibold rounded-xl p-1 mb-1 ${event.jadwal ? 'bg-[#3AD55C]' : 'bg-[#B6D53A]'}`}>
                          {event.jadwal ? `Content: ${event.sosmed_id.username}` : `Task: ${event.assign}`}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="ml-2 mt-8 w-1/3">
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <h3 className="text-lg font-semibold mb-2">Nearest Activity</h3>
              <ul>
                {getNearestActivities().map((event, idx) => (
                  <li key={idx} className="mb-1 text-left">
                    {event.jadwal ? `Content: ${event.sosmed_id.username}` : `Task: ${event.assign}`}{" "}
                    <span className="text-gray-500 font-light float-right">
                      {moment.utc(event.tenggat_waktu || event.jadwal).fromNow()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 bg-gray-100 p-4 rounded shadow-md">
              <h3 className="text-lg font-bold mb-2">Post Summary</h3>
              <ul>
                <li className="mb-1 text-left">
                  Scheduled Posts <span className="float-right text-purple">{countScheduledPosts}</span>
                </li>
                <li className="mb-1 text-left">
                  Not Uploaded Posts <span className="float-right text-purple">{countNotUploadedPosts}</span>
                </li>
                <li className="mb-1 text-left">
                  Uploaded Posts <span className="float-right text-purple">{countUploadedPosts}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ModalEventDetails
        show={showModal}
        onClose={() => setShowModal(false)}
        events={selectedEvents}
      />
    </div>
  );
};

export default Dashboard;
