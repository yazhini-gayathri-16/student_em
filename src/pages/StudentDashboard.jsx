import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import SideBar from '../components/SideBar.jsx';
import EventList from '../components/EventList.jsx';
import { eventService } from '../services/eventService.js';
import { authService } from '../services/authService.js';
import { sampleEvents } from '../data/sampleEvents.js';

const StudentDashboard = ({ onRegister, onNavigate }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    teamSize: '',
    eventType: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [events, filters]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const fetchedEvents = await eventService.getAllEvents();

      // If no events from Firebase, use sample data
      if (fetchedEvents.length === 0) {
        setEvents(sampleEvents);
      } else {
        setEvents(fetchedEvents);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      // Fallback to sample data on error
      setEvents(sampleEvents);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = events;

    if (filters.location) {
      filtered = filtered.filter(event =>
        event.location && event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.teamSize) {
      filtered = filtered.filter(event =>
        event.teamSize && event.teamSize === filters.teamSize
      );
    }

    if (filters.eventType) {
      filtered = filtered.filter(event =>
        event.type && event.type.toLowerCase() === filters.eventType.toLowerCase()
      );
    }

    setFilteredEvents(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleRegister = (eventId) => {
    // Navigate to registration page
    if (onRegister) {
      onRegister(eventId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onLogout={handleLogout} />
        <div className="flex">
          <SideBar filters={filters} onFilterChange={handleFilterChange} activeSection="dashboard" onNavigate={onNavigate} />
          <main className="flex-1 p-6">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-button-primary)]"></div>
              <p className="ml-4 text-gray-600">Loading events...</p>
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
        <SideBar
          filters={filters}
          onFilterChange={handleFilterChange}
          activeSection="dashboard"
          onNavigate={onNavigate}
        />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Current events</h1>

          {filteredEvents.length > 0 ? (
            <div className="space-y-3">
              <EventList
                events={filteredEvents}
                onRegister={handleRegister}
              />
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <p className="text-gray-500 text-lg">No events match your current filters.</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filter criteria to see more events.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;