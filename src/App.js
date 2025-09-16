import React, { useState } from 'react';
import StudentDashboard from './pages/StudentDashboard.jsx';
import EventRegistration from './pages/EventRegistration.jsx';
import RegistrationForm from './pages/RegistrationForm.jsx';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEventTitle, setSelectedEventTitle] = useState('');

  const handleRegister = (eventId) => {
    setSelectedEventId(eventId);
    setCurrentPage('registration');
  };

  const handleProceedToForm = (eventId, eventTitle) => {
    setSelectedEventId(eventId);
    setSelectedEventTitle(eventTitle);
    setCurrentPage('form');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setSelectedEventId(null);
    setSelectedEventTitle('');
  };

  const handleBackToRegistration = () => {
    setCurrentPage('registration');
  };

  return (
    <div className="App">
      {currentPage === 'dashboard' && (
        <StudentDashboard onRegister={handleRegister} />
      )}
      {currentPage === 'registration' && (
        <EventRegistration
          eventId={selectedEventId}
          onBack={handleBackToDashboard}
          onNext={handleProceedToForm}
        />
      )}
      {currentPage === 'form' && (
        <RegistrationForm
          eventId={selectedEventId}
          eventTitle={selectedEventTitle}
          onBack={handleBackToRegistration}
        />
      )}
    </div>
  );
}

export default App;