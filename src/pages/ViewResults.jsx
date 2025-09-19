import React from 'react';
import Header from '../components/Header.jsx';
import SideBar from '../components/SideBar.jsx';
import { authService } from '../services/authService.js';
import { ChevronLeft } from 'lucide-react';

const ViewResults = ({ event, onNavigate, onBack }) => {
  const handleLogout = async () => {
    try {
      await authService.logout();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const isEventStarted = (eventDate) => {
    if (!eventDate) return false;

    // Parse the event date and compare with current date
    const today = new Date();
    const eventDateObj = new Date(eventDate);

    // If the event date has passed, consider it started
    return eventDateObj <= today;
  };

  const formatEventDate = (dateString) => {
    if (!dateString) return 'Date not specified';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString; // Return original string if parsing fails
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onLogout={handleLogout} />
        <div className="flex">
          <SideBar activeSection="view-results" onNavigate={onNavigate} />
          <main className="flex-1 p-6">
            <div className="text-center">
              <p className="text-gray-500">Event not found.</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const eventStarted = isEventStarted(event.date);

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
            <h1 className="text-2xl font-semibold text-gray-800">Results</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Venue:</span> {event.venue || event.location}</p>
                <p><span className="font-medium">Date:</span> {formatEventDate(event.date)}</p>
                {event.time && (
                  <p><span className="font-medium">Time:</span> {event.time}</p>
                )}
              </div>
            </div>

            {!eventStarted ? (
              <div className="text-center py-12">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Event has not started yet</h3>
                <p className="text-gray-600">Results will be available after the event begins on {formatEventDate(event.date)}.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Event Results</h3>
                  <p className="text-gray-600 mb-6">Here are your results for {event.title}</p>
                </div>

                {/* Results Table/Content */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score/Result
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Registration
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Successfully registered
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Participation
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            In Progress
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Awaiting event completion
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Final Result
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Results pending
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        <strong>Note:</strong> Final results and rankings will be updated once the event organizers publish them.
                        You will be notified via email when results are available.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewResults;