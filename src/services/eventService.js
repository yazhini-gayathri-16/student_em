import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../utils/firebase.js';

export const eventService = {
  // Get all events
  getAllEvents: async () => {
    try {
      const eventsCollection = collection(db, 'events');
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return eventsList;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  // Get single event by ID
  getEventById: async (eventId) => {
    try {
      const eventDoc = doc(db, 'events', eventId);
      const eventSnapshot = await getDoc(eventDoc);

      if (eventSnapshot.exists()) {
        return {
          id: eventSnapshot.id,
          ...eventSnapshot.data()
        };
      } else {
        throw new Error('Event not found');
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
    }
  },

  // Register for an event
  registerForEvent: async (eventId, studentData) => {
    try {
      const registrationsCollection = collection(db, 'registrations');
      const registrationData = {
        eventId,
        studentId: studentData.id,
        studentName: studentData.name,
        studentEmail: studentData.email,
        registrationDate: new Date().toISOString(),
        status: 'registered'
      };

      const docRef = await addDoc(registrationsCollection, registrationData);
      return docRef.id;
    } catch (error) {
      console.error('Error registering for event:', error);
      throw error;
    }
  },

  // Get registrations for a student
  getStudentRegistrations: async (studentId) => {
    try {
      const registrationsCollection = collection(db, 'registrations');
      const registrationsSnapshot = await getDocs(registrationsCollection);
      const registrations = registrationsSnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(registration => registration.studentId === studentId);

      return registrations;
    } catch (error) {
      console.error('Error fetching student registrations:', error);
      throw error;
    }
  }
};