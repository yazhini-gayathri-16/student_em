import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import Header from '../components/Header.jsx';
import SideBar from '../components/SideBar.jsx';
import { registrationFormService } from '../services/registrationFormService.js';
import { authService } from '../services/authService.js';
import PreviewModal from '../components/PreviewModal.jsx';

const RegistrationForm = ({ eventId, eventTitle, eventDetails, onBack, onRegistrationComplete, onNavigate }) => {
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchForm();
  }, [eventId]);

  const fetchForm = async () => {
    try {
      setLoading(true);
      setError(null);
      const formData = await registrationFormService.getRegistrationForm(eventId, eventTitle);
      setForm(formData);

      // Initialize form data with empty values
      const initialFormData = {};
      formData.fields.forEach(field => {
        initialFormData[field.id] = field.type === 'radio' ? '' : '';
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error fetching form:', error);
      setError('Failed to load registration form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);

      // Validate required fields
      const requiredFields = form.fields.filter(field => field.required);
      const missingFields = requiredFields.filter(field => !formData[field.id] || formData[field.id].trim() === '');

      if (missingFields.length > 0) {
        setError(`Please fill in all required fields: ${missingFields.map(f => f.label).join(', ')}`);
        return;
      }

      await registrationFormService.submitRegistration(eventId, formData);

      // Save registered event to localStorage
      const registeredEvents = JSON.parse(localStorage.getItem('registeredEvents') || '[]');
      const newRegistration = {
        id: eventId,
        title: eventTitle,
        venue: eventDetails?.location || eventDetails?.venue || 'Not specified',
        date: eventDetails?.date || 'Not specified',
        time: eventDetails?.time || 'Not specified',
        type: eventDetails?.type || 'Not specified',
        teamSize: eventDetails?.teamSize || 'Not specified',
        description: eventDetails?.description || eventTitle,
        prerequisites: eventDetails?.prerequisites || [],
        registeredAt: new Date().toISOString(),
        formData: formData
      };

      // Check if already registered
      if (!registeredEvents.some(event => event.id === eventId)) {
        registeredEvents.push(newRegistration);
        localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));
      }

      alert('Registration submitted successfully!');
      if (onRegistrationComplete) {
        onRegistrationComplete();
      } else {
        onBack();
      }
    } catch (error) {
      console.error('Error submitting registration:', error);
      setError('Failed to submit registration. Please try again.');
    } finally {
      setSubmitting(false);
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

  const renderFormField = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <input
            type={field.type}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-button-primary)] focus:border-transparent text-sm"
            required={field.required}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-button-primary)] focus:border-transparent text-sm resize-vertical"
            required={field.required}
          />
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={formData[field.id] === option}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className="w-4 h-4 text-[var(--color-button-primary)] focus:ring-[var(--color-button-primary)]"
                  required={field.required}
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={option}
                  checked={(formData[field.id] || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = formData[field.id] || [];
                    let newValues;
                    if (e.target.checked) {
                      newValues = [...currentValues, option];
                    } else {
                      newValues = currentValues.filter(v => v !== option);
                    }
                    handleInputChange(field.id, newValues);
                  }}
                  className="w-4 h-4 text-[var(--color-button-primary)] focus:ring-[var(--color-button-primary)]"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onLogout={handleLogout} />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-button-primary)]"></div>
          <p className="ml-4 text-gray-600">Loading registration form...</p>
        </div>
      </div>
    );
  }

  if (error && !form) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onLogout={handleLogout} />
        <div className="p-6">
          <button
            onClick={onBack}
            className="flex items-center text-[var(--color-button-primary)] hover:text-[var(--color-button-secondary)] mb-4 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
          </button>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
            <button
              onClick={fetchForm}
              className="mt-2 text-red-600 hover:text-red-800 font-medium"
            >
              Try again
            </button>
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
          {/* Back Arrow */}
          <button
            onClick={onBack}
            className="flex items-center text-[var(--color-button-primary)] hover:text-[var(--color-button-secondary)] mb-4 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
          </button>

          {/* Registration Form Header */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-800">Registration form</h1>
            <p className="text-gray-600 text-sm mt-1">{eventTitle}</p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {form?.fields?.map((field) => (
                <div key={field.id} className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderFormField(field)}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={onBack}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Back
              </button>
              <button
                onClick={() => setShowPreview(true)}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
              >
                Preview
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal
          form={form}
          formData={formData}
          eventTitle={eventTitle}
          onClose={() => setShowPreview(false)}
          onEdit={() => setShowPreview(false)}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
    </div>
  );
};

export default RegistrationForm;