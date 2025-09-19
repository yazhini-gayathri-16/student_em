import React from 'react';
import Header from '../components/Header.jsx';
import SideBar from '../components/SideBar.jsx';
import { authService } from '../services/authService.js';
import { ChevronLeft } from 'lucide-react';

const EventDetails = ({ event, onNavigate, onBack, onViewResults }) => {
  const handleLogout = async () => {
    try {
      await authService.logout();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleViewResults = () => {
    if (onViewResults) {
      onViewResults(event);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onLogout={handleLogout} />
        <div className="flex">
          <SideBar activeSection="registered" onNavigate={onNavigate} />
          <main className="flex-1 p-6">
            <div className="text-center">
              <p className="text-gray-500">Event not found.</p>
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
        <SideBar activeSection="registered" onNavigate={onNavigate} />

        <main className="flex-1 p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">Registered events</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Event description</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Overview</h3>
                <p className="text-gray-600 mb-4">{event.description || event.title}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Dates:</span> {event.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Time:</span> {event.time || '9:30 AM - 5:00 PM IST (Both days, including breaks for lunch and networking).'}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Venue:</span> {event.venue || event.location}
                  </p>
                </div>
              </div>

              {event.prerequisites && (
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Prerequisites</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    {Array.isArray(event.prerequisites) ? (
                      event.prerequisites.map((prereq, index) => (
                        <p key={index}>• {prereq}</p>
                      ))
                    ) : (
                      <p>• {event.prerequisites}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Event Type:</span> {event.type || 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Team Size:</span> {event.teamSize || 'Not specified'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleViewResults}
                className="px-6 py-2 bg-[var(--color-button-primary)] text-white rounded-lg hover:bg-[var(--color-button-primary-hover)] transition-colors"
              >
                View Results
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventDetails;