import React from 'react';
import { X } from 'lucide-react';

const PreviewModal = ({ form, formData, eventTitle, onClose, onEdit, onSubmit, submitting }) => {
  const formatFieldValue = (field, value) => {
    if (!value || value === '') return 'Not provided';

    switch (field.type) {
      case 'checkbox':
        return Array.isArray(value) ? value.join(', ') : value;
      case 'radio':
        return value;
      case 'textarea':
        return value;
      default:
        return value;
    }
  };

  const getDisplayLabel = (field) => {
    // Clean up labels to remove asterisks and formatting for display
    const cleanLabel = field.label?.replace(/\*\s*$/, '').trim() || field.label;

    // Common field mappings for display
    const labelMappings = {
      'registration_number': 'Registration number',
      'year': 'Year',
      'team_leader_email': 'Team lead Email ID',
      'team_member_name': 'Team member Name',
      'team_member_email': 'Team member mail ID',
      'project_title': 'Project Title',
      'abstract': 'Abstract'
    };

    return labelMappings[field.id] || cleanLabel;
  };

  // Derive team leader name from email if available
  const getTeamLeaderName = () => {
    const email = formData.team_leader_email || formData.team_leader_email;
    if (email) {
      // Extract name from email (everything before @)
      const name = email.split('@')[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return 'Not provided';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Registration form</h2>
            <p className="text-sm text-gray-600">Preview</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            {/* Show Team Lead Name first if we can derive it */}
            {formData.team_leader_email && (
              <div className="flex">
                <span className="font-semibold text-gray-700 min-w-[140px]">Team lead Name:</span>
                <span className="text-gray-600">{getTeamLeaderName()}</span>
              </div>
            )}

            {/* Dynamic form fields - show all filled data */}
            {form?.fields?.map((field) => {
              const value = formData[field.id];
              const displayValue = formatFieldValue(field, value);

              // Skip empty optional fields
              if (!value && !field.required) {
                return null;
              }

              return (
                <div key={field.id} className={field.type === 'textarea' ? '' : 'flex'}>
                  <span className="font-semibold text-gray-700 min-w-[140px]">
                    {getDisplayLabel(field)}:
                  </span>
                  {field.type === 'textarea' ? (
                    <p className="text-gray-600 mt-1 leading-relaxed">
                      {displayValue}
                    </p>
                  ) : (
                    <span className="text-gray-600">{displayValue}</span>
                  )}
                </div>
              );
            })}

            {/* Show message if no data is filled */}
            {(!form?.fields || form.fields.length === 0) && (
              <div className="text-center py-8">
                <p className="text-gray-500">No form data available</p>
              </div>
            )}

            {/* Show message if all fields are empty */}
            {form?.fields && form.fields.length > 0 &&
             !form.fields.some(field => formData[field.id]) && (
              <div className="text-center py-8">
                <p className="text-gray-500">No answers provided yet</p>
                <p className="text-gray-400 text-sm mt-1">Please fill out the form before previewing</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end space-x-3 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
          >
            Back
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
          >
            Edit
          </button>
          <button
            onClick={onSubmit}
            disabled={submitting}
            className="px-4 py-2 bg-[var(--color-button-primary)] hover:bg-[var(--color-button-secondary)] text-white rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;