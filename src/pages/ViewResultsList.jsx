import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import SideBar from '../components/SideBar.jsx';
import { authService } from '../services/authService.js';
import { ChevronLeft } from 'lucide-react';

const ViewResultsList = ({ onNavigate, onEventClick, onBack }) => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegisteredEvents();
  }, []);

  const fetchRegisteredEvents = () => {
    // Get registered events from localStorage for now
    const registered = localStorage.getItem('registeredEvents');
    if (registered) {
      setRegisteredEvents(JSON.parse(registered));
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleEventClick = (event) => {
    if (onEventClick) {
      onEventClick(event);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onLogout={handleLogout} />
        <div className="flex">
          <SideBar activeSection="view-results" onNavigate={onNavigate} />
          <main className="flex-1 p-6">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-button-primary)]"></div>
              <p className="ml-4 text-gray-600">Loading registered events...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} />

      <div className="flex">
        <SideBar activeSection="view-results" onNavigate={onNavigate} />

        <main className="flex-1 p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">View Results</h1>
          </div>

          <div className="flex items-center mb-6">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-button-primary)] focus:border-transparent">
              <option>Round 1</option>
              <option>Round 2</option>
              <option>Round 3</option>
            </select>
          </div>

          {registeredEvents.length > 0 ? (
            <div className="space-y-3">
              {registeredEvents.map((event, index) => (
                <div
                  key={index}
                  onClick={() => handleEventClick(event)}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{event.title}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">Venue:</span> {event.venue || event.location}</p>
                        <p><span className="font-medium">Date:</span> {event.date}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        Click to view results
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <p className="text-gray-500 text-lg">No registered events found.</p>
              <p className="text-gray-400 text-sm mt-2">Register for some events to view their results here.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ViewResultsList;