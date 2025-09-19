import React, { useState } from 'react';
import StudentDashboard from './pages/StudentDashboard.jsx';
import EventRegistration from './pages/EventRegistration.jsx';
import RegistrationForm from './pages/RegistrationForm.jsx';
import RegisteredEvents from './pages/RegisteredEvents.jsx';
import EventDetails from './pages/EventDetails.jsx';
import ViewResults from './pages/ViewResults.jsx';
import ViewResultsList from './pages/ViewResultsList.jsx';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEventTitle, setSelectedEventTitle] = useState('');
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);

  const handleRegister = (eventId) => {
    setSelectedEventId(eventId);
    setCurrentPage('registration');
  };

  const handleProceedToForm = (eventId, eventTitle, eventDetails) => {
    setSelectedEventId(eventId);
    setSelectedEventTitle(eventTitle);
    setSelectedEventDetails(eventDetails);
    setCurrentPage('form');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setSelectedEventId(null);
    setSelectedEventTitle('');
    setSelectedEventDetails(null);
  };

  const handleBackToRegistration = () => {
    setCurrentPage('registration');
  };

  const handleNavigateToRegisteredEvents = () => {
    setCurrentPage('registered-events');
  };

  const handleNavigateToEventDetails = (event) => {
    setSelectedEventDetails(event);
    setCurrentPage('event-details');
  };

  const handleBackToRegisteredEvents = () => {
    setCurrentPage('registered-events');
  };

  const handleNavigateToViewResults = (event) => {
    setSelectedEventDetails(event);
    setCurrentPage('view-results');
  };

  const handleNavigateToViewResultsFromList = (event) => {
    setSelectedEventDetails(event);
    setCurrentPage('view-results-from-list');
  };

  const handleBackToEventDetails = () => {
    setCurrentPage('event-details');
  };

  const handleBackToViewResultsList = () => {
    setCurrentPage('view-results-list');
  };

  const handleNavigation = (section) => {
    switch (section) {
      case 'dashboard':
        handleBackToDashboard();
        break;
      case 'registered':
        handleNavigateToRegisteredEvents();
        break;
      case 'view-results':
        setCurrentPage('view-results-list');
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      {currentPage === 'dashboard' && (
        <StudentDashboard
          onRegister={handleRegister}
          onNavigate={handleNavigation}
        />
      )}
      {currentPage === 'registration' && (
        <EventRegistration
          eventId={selectedEventId}
          onBack={handleBackToDashboard}
          onNext={handleProceedToForm}
          onNavigate={handleNavigation}
        />
      )}
      {currentPage === 'form' && (
        <RegistrationForm
          eventId={selectedEventId}
          eventTitle={selectedEventTitle}
          eventDetails={selectedEventDetails}
          onBack={handleBackToRegistration}
          onRegistrationComplete={handleNavigateToRegisteredEvents}
          onNavigate={handleNavigation}
        />
      )}
      {currentPage === 'registered-events' && (
        <RegisteredEvents
          onNavigate={handleNavigation}
          onEventClick={handleNavigateToEventDetails}
          onBack={handleBackToDashboard}
          onViewResults={handleNavigateToViewResults}
        />
      )}
      {currentPage === 'event-details' && (
        <EventDetails
          event={selectedEventDetails}
          onNavigate={handleNavigation}
          onBack={handleBackToRegisteredEvents}
          onViewResults={handleNavigateToViewResults}
        />
      )}
      {currentPage === 'view-results' && (
        <ViewResults
          event={selectedEventDetails}
          onNavigate={handleNavigation}
          onBack={handleBackToEventDetails}
        />
      )}
      {currentPage === 'view-results-list' && (
        <ViewResultsList
          onNavigate={handleNavigation}
          onEventClick={handleNavigateToViewResultsFromList}
          onBack={handleBackToDashboard}
        />
      )}
      {currentPage === 'view-results-from-list' && (
        <ViewResults
          event={selectedEventDetails}
          onNavigate={handleNavigation}
          onBack={handleBackToViewResultsList}
        />
      )}
    </div>
  );
}

export default App;