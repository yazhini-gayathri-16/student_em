import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase.js';
import { masterFormBridge } from '../utils/masterFormBridge.js';

export const registrationFormService = {
  // Get registration form for an event from master's system
  getRegistrationForm: async (eventId, eventTitle) => {
    try {
      // First try to get from Firebase
      const formDoc = doc(db, 'registrationForms', eventId);
      const formSnapshot = await getDoc(formDoc);

      if (formSnapshot.exists()) {
        return {
          id: formSnapshot.id,
          ...formSnapshot.data()
        };
      }

      // Try to get form from master's system using the bridge
      const masterForm = masterFormBridge.getFormByEvent(eventId, eventTitle);

      if (masterForm) {
        const studentForm = masterFormBridge.convertMasterFormToStudentForm(masterForm, eventId);
        if (studentForm) {
          return studentForm;
        }
      }

      // Final fallback: Return a sample form matching the reference image
      return {
        id: eventId,
        eventId: eventId,
        title: 'Participation Form',
        description: 'Please fill out this participation form',
        fields: [
          {
            id: 'registration_number',
            type: 'text',
            label: 'Enter registration number *',
            required: true,
            placeholder: '412578xyz'
          },
          {
            id: 'year',
            type: 'radio',
            label: 'Which year you belong to? *',
            required: true,
            options: ['1st year', '2nd year', '3rd year', '4th year']
          },
          {
            id: 'team_leader_email',
            type: 'email',
            label: 'Enter e-mail ID of the team leader *',
            required: true,
            placeholder: '412578xyz@student.com'
          },
          {
            id: 'team_member_name',
            type: 'text',
            label: 'Team member Name',
            required: false,
            placeholder: 'Enter team member name'
          },
          {
            id: 'team_member_email',
            type: 'email',
            label: 'Team member mail ID',
            required: false,
            placeholder: 'teammember@gmail.com'
          },
          {
            id: 'project_title',
            type: 'text',
            label: 'Project Title',
            required: true,
            placeholder: 'Enter your project title'
          },
          {
            id: 'abstract',
            type: 'textarea',
            label: 'Abstract',
            required: true,
            placeholder: 'Enter project abstract...'
          }
        ]
      };
    } catch (error) {
      console.error('Error fetching registration form:', error);
      throw error;
    }
  },

  // Submit registration form
  submitRegistration: async (eventId, formData) => {
    try {
      const registrationsCollection = collection(db, 'eventRegistrations');
      const registrationData = {
        eventId,
        formData,
        submittedAt: new Date().toISOString(),
        status: 'submitted'
      };

      const docRef = await addDoc(registrationsCollection, registrationData);
      return docRef.id;
    } catch (error) {
      console.error('Error submitting registration:', error);
      throw error;
    }
  }
};