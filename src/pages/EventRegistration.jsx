import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import Header from '../components/Header.jsx';
import SideBar from '../components/SideBar.jsx';
import { eventService } from '../services/eventService.js';
import { authService } from '../services/authService.js';

const EventRegistration = ({ eventId, onBack, onNext, onNavigate }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to get event from Firebase, fallback to sample data
      let eventData;
      try {
        eventData = await eventService.getEventById(eventId);
      } catch (err) {
        // If not found in Firebase, check sample data
        const { sampleEvents } = await import('../data/sampleEvents.js');
        eventData = sampleEvents.find(e => e.id === eventId);

        if (!eventData) {
          throw new Error('Event not found');
        }
      }

      setEvent(eventData);
    } catch (error) {
      console.error('Error fetching event details:', error);
      setError('Failed to load event details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext(eventId, event.title, event);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onLogout={handleLogout} />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-button-primary)]"></div>
          <p className="ml-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onLogout={handleLogout} />
        <div className="p-6">
          <button
            onClick={onBack}
            className="flex items-center text-[var(--color-button-primary)] hover:text-[var(--color-button-secondary)] mb-4 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Events
          </button>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
            <button
              onClick={fetchEventDetails}
              className="mt-2 text-red-600 hover:text-red-800 font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onLogout={handleLogout} />
        <div className="p-6">
          <button
            onClick={onBack}
            className="flex items-center text-[var(--color-button-primary)] hover:text-[var(--color-button-secondary)] mb-4 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Events
          </button>
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-600">Event not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} />

      <div className="flex">
        <SideBar activeSection="dashboard" onNavigate={onNavigate} />

        <main className="flex-1 p-6">
          {/* Back Arrow - Outside sidebar */}
          <button
            onClick={onBack}
            className="flex items-center text-[var(--color-button-primary)] hover:text-[var(--color-button-secondary)] mb-4 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
          </button>
          {/* Registration Header */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-800">
              Registration
            </h1>
            <p className="text-gray-600 text-sm mt-1">{event.title}</p>
          </div>

          {/* Event Details Container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Event description</h2>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Overview</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {event.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Dates:</span>
                  <span className="ml-2 text-gray-600">{event.date}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Time:</span>
                  <span className="ml-2 text-gray-600">
                    {event.time || "9:30 AM – 5:00 PM IST (Both days, including breaks for lunch and networking)."}
                  </span>
                </div>
                <div className="md:col-span-2">
                  <span className="font-semibold text-gray-700">Venue:</span>
                  <span className="ml-2 text-gray-600">
                    {event.venue || `Conference Hall, IT Madras Research Park, Taramani, Chennai.`}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Prerequisites</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• A solid understanding of Python programming is mandatory.</li>
                  <li>• Familiarity with basic Machine Learning concepts is highly recommended.</li>
                  <li>• Prior experience with APIs or web frameworks is beneficial but not required.</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Event Type:</span>
                  <span className="ml-2 text-gray-600">{event.type}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Team Size:</span>
                  <span className="ml-2 text-gray-600">{event.teamSize}</span>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-[var(--color-button-primary)] hover:bg-[var(--color-button-secondary)] text-white rounded-lg transition-colors text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventRegistration;