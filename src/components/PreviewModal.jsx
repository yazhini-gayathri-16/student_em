import React from 'react';
import { X } from 'lucide-react';

const PreviewModal = ({ form, formData, eventTitle, onClose, onEdit, onSubmit, submitting }) => {
  const formatFieldValue = (field, value) => {
    if (!value) return 'Not provided';

    switch (field.type) {
      case 'checkbox':
        return Array.isArray(value) ? value.join(', ') : value;
      default:
        return value;
    }
  };

  const getFieldLabel = (field) => {
    switch (field.id) {
      case 'registration_number':
        return 'Registration number';
      case 'year':
        return 'Year';
      case 'team_leader_email':
        return 'Team lead Email ID';
      case 'team_member_name':
        return 'Team member Name';
      case 'team_member_email':
        return 'Team member mail ID';
      case 'project_title':
        return 'Project Title';
      case 'abstract':
        return 'Abstract';
      default:
        return field.label;
    }
  };

  // Mock data for demonstration - replace with actual form data
  const previewData = {
    registration_number: formData.registration_number || '412578xyz',
    team_leader_name: 'Varsha', // This could be derived from form or user profile
    year: formData.year || '3rd year',
    team_leader_email: formData.team_leader_email || 'varsha123@gmail.com',
    team_member_name: formData.team_member_name || 'Anu',
    team_member_email: formData.team_member_email || 'Anu123@gmail.com',
    project_title: formData.project_title || 'AquaSentient',
    abstract: formData.abstract || 'The Chennai metropolitan area is highly susceptible to severe urban flooding during the annual monsoon season, leading to significant disruption and potential danger. To address this critical issue, this project aims to design and develop "AquaSentient," an intelligent, real-time system for predicting and managing flood events. The system will'
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
            {/* Registration Number */}
            <div className="flex">
              <span className="font-semibold text-gray-700 min-w-[140px]">Registration number:</span>
              <span className="text-gray-600">{previewData.registration_number}</span>
            </div>

            {/* Team Lead Name */}
            <div className="flex">
              <span className="font-semibold text-gray-700 min-w-[140px]">Team lead Name:</span>
              <span className="text-gray-600">{previewData.team_leader_name}</span>
            </div>

            {/* Year */}
            <div className="flex">
              <span className="font-semibold text-gray-700 min-w-[140px]">Year:</span>
              <span className="text-gray-600">{previewData.year}</span>
            </div>

            {/* Team Lead Email */}
            <div className="flex">
              <span className="font-semibold text-gray-700 min-w-[140px]">Team lead Email ID:</span>
              <span className="text-gray-600">{previewData.team_leader_email}</span>
            </div>

            {/* Team Member Name */}
            <div className="flex">
              <span className="font-semibold text-gray-700 min-w-[140px]">Team member Name:</span>
              <span className="text-gray-600">{previewData.team_member_name}</span>
            </div>

            {/* Team Member Email */}
            <div className="flex">
              <span className="font-semibold text-gray-700 min-w-[140px]">Team member mail ID:</span>
              <span className="text-gray-600">{previewData.team_member_email}</span>
            </div>

            {/* Project Title */}
            <div className="flex">
              <span className="font-semibold text-gray-700 min-w-[140px]">Project Title:</span>
              <span className="text-gray-600">{previewData.project_title}</span>
            </div>

            {/* Abstract */}
            <div>
              <span className="font-semibold text-gray-700">Abstract:</span>
              <p className="text-gray-600 mt-1 leading-relaxed">
                {previewData.abstract}
              </p>
            </div>
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