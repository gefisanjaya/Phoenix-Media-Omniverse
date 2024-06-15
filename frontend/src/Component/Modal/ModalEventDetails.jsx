import React from 'react';
import moment from 'moment';

const ModalEventDetails = ({ show, onClose, events }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[28rem]">
        <h2 className="text-lg font-semibold mb-4">Event Details</h2>
        <div className="mb-4 text-left">
          <label className="block text-sm font-bold mb-1">Date</label>
          <p>{moment(events.length > 0 ? (events[0].tenggat_waktu || events[0].jadwal) : new Date()).format('dddd, D MMMM YYYY')}</p>
        </div>
        <div className="mb-4 text-left">
          <label className="block text-sm font-bold mb-1">Events</label>
          {events.length > 0 ? (
            <ul>
              {events.map((event, idx) => (
                <li key={idx} className="mb-1 text-left">
                  {event.jadwal ? `Content: ${event.sosmed_id.username}` : `Task: ${event.assign}`}
                  <span className="block text-gray font-light float-right">
                    {moment(event.tenggat_waktu || event.jadwal).format('hh:mm A')}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>There is no event today</p>
          )}
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-purple text-white rounded-lg">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEventDetails;
