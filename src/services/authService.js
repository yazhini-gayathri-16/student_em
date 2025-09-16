import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase.js';

export const authService = {
  // Login user
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  // Register user
  register: async (email, password, userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        name: userData.name,
        studentId: userData.studentId,
        department: userData.department,
        year: userData.year,
        createdAt: new Date().toISOString(),
        role: 'student'
      });

      return user;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  // Get user profile
  getUserProfile: async (userId) => {
    try {
      const userDoc = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        return {
          id: userSnapshot.id,
          ...userSnapshot.data()
        };
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
};