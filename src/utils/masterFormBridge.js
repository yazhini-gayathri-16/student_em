// Bridge to access master's forms from the eveman-main application
// This handles cross-application data sharing through localStorage

// Sample forms fallback (copied from master's structure for independence)
const SAMPLE_FORMS = [
  {
    id: 1,
    title: 'IEEE Xtreme',
    description: 'Participation form for IEEE Xtreme event',
    questions: [
      { id: 'q1', type: 'text', question: 'Enter registration number *', placeholder: '41242131xyz' },
      { id: 'q2', type: 'radio', question: 'Which year you belong to? *', options: ['1st year', '2nd year', '3rd year', '4th year'] },
      { id: 'q3', type: 'text', question: "Enter e-mail ID of the team leader *", placeholder: '41242131xyz@gmail.com' }
    ]
  },
  {
    id: 2,
    title: 'IEEE Yesist',
    description: 'Participation form for IEEE Yesist event',
    questions: [
      { id: 'q1', type: 'text', question: 'Team name' }
    ]
  },
  {
    id: 3,
    title: 'IEEE technovita',
    description: 'Participation form for IEEE technovita',
    questions: [
      { id: 'q1', type: 'text', question: 'Team leader name' }
    ]
  }
];

export const masterFormBridge = {
  // Get participation forms from master's localStorage
  getParticipationForms: (projectId) => {
    try {
      const forms = localStorage.getItem(`participationForms_${projectId}`);
      return forms ? JSON.parse(forms) : [];
    } catch (error) {
      console.error('Error getting participation forms:', error);
      return [];
    }
  },

  // Get forms by event title or ID
  getFormByEvent: (eventId, eventTitle) => {
    try {
      // First try to get from master's localStorage
      const possibleProjectIds = [
        eventId,
        eventTitle,
        eventTitle?.replace(/\s+/g, '_').toLowerCase(),
        'sample1', 'sample2', 'sample3', 'sample4', 'sample5'
      ];

      for (const projectId of possibleProjectIds) {
        if (projectId) {
          const masterForms = masterFormBridge.getParticipationForms(projectId);
          if (masterForms && masterForms.length > 0) {
            return masterForms[0]; // Return first form for the project
          }
        }
      }

      // Fallback to sample forms from master
      const matchingForm = SAMPLE_FORMS.find(form =>
        form.title.toLowerCase().includes(eventTitle?.toLowerCase() || '') ||
        form.id === eventId
      );

      if (matchingForm) {
        return {
          name: matchingForm.title,
          title: matchingForm.title,
          description: matchingForm.description,
          questions: matchingForm.questions
        };
      }

      return null;
    } catch (error) {
      console.error('Error getting form by event:', error);
      return null;
    }
  },

  // Map master's question format to student form field format
  convertMasterFormToStudentForm: (masterForm, eventId) => {
    if (!masterForm) return null;

    return {
      id: eventId,
      eventId: eventId,
      title: masterForm.name || masterForm.title || 'Participation Form',
      description: masterForm.description || 'Please fill out this participation form',
      fields: masterForm.questions?.map((question, index) => ({
        id: question.id?.toString() || `q${index + 1}`,
        type: masterFormBridge.mapQuestionType(question.type),
        label: question.question || question.text,
        required: question.required || question.question?.includes('*') || false,
        placeholder: question.placeholder || '',
        options: question.options || []
      })) || []
    };
  },

  // Map master's question types to student form field types
  mapQuestionType: (masterType) => {
    switch (masterType) {
      case 'short-answer':
        return 'text';
      case 'paragraph':
        return 'textarea';
      case 'multiple-choice':
        return 'radio';
      case 'checkboxes':
        return 'checkbox';
      case 'text':
        return 'text';
      case 'radio':
        return 'radio';
      default:
        return 'text';
    }
  },

  // Save form responses (could be extended to save back to master)
  saveFormResponse: (eventId, formData) => {
    try {
      const responses = localStorage.getItem('studentFormResponses') || '{}';
      const parsedResponses = JSON.parse(responses);

      parsedResponses[eventId] = {
        ...formData,
        submittedAt: new Date().toISOString()
      };

      localStorage.setItem('studentFormResponses', JSON.stringify(parsedResponses));
      return true;
    } catch (error) {
      console.error('Error saving form response:', error);
      return false;
    }
  },

  // Get saved form responses
  getFormResponse: (eventId) => {
    try {
      const responses = localStorage.getItem('studentFormResponses') || '{}';
      const parsedResponses = JSON.parse(responses);
      return parsedResponses[eventId] || null;
    } catch (error) {
      console.error('Error getting form response:', error);
      return null;
    }
  }
};