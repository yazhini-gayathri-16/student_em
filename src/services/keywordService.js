import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../utils/firebase.js';

export const keywordService = {
  // Get all master keywords
  getAllKeywords: async () => {
    try {
      const keywordsCollection = collection(db, 'eventKeywords');
      const keywordsSnapshot = await getDocs(keywordsCollection);
      const keywordsList = keywordsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return keywordsList;
    } catch (error) {
      console.error('Error fetching keywords:', error);
      // Return fallback keywords if Firebase fails
      return [
        { id: 'k1', keyword: 'Hackathon', createdBy: 'master', createdAt: new Date().toISOString() },
        { id: 'k2', keyword: 'Ideathon', createdBy: 'master', createdAt: new Date().toISOString() },
        { id: 'k3', keyword: 'Competition', createdBy: 'master', createdAt: new Date().toISOString() },
        { id: 'k4', keyword: 'Workshop', createdBy: 'master', createdAt: new Date().toISOString() },
        { id: 'k5', keyword: 'Coding Challenge', createdBy: 'master', createdAt: new Date().toISOString() },
        { id: 'k6', keyword: 'Design Contest', createdBy: 'master', createdAt: new Date().toISOString() },
        { id: 'k7', keyword: 'AI/ML Challenge', createdBy: 'master', createdAt: new Date().toISOString() },
        { id: 'k8', keyword: 'Data Science', createdBy: 'master', createdAt: new Date().toISOString() },
        { id: 'k9', keyword: 'Robotics', createdBy: 'master', createdAt: new Date().toISOString() },
        { id: 'k10', keyword: 'Cybersecurity', createdBy: 'master', createdAt: new Date().toISOString() }
      ];
    }
  },

  // Add new keyword (master function)
  addKeyword: async (keyword, createdBy = 'master') => {
    try {
      const keywordsCollection = collection(db, 'eventKeywords');
      const keywordData = {
        keyword: keyword.trim(),
        createdBy,
        createdAt: new Date().toISOString(),
        isActive: true
      };

      const docRef = await addDoc(keywordsCollection, keywordData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding keyword:', error);
      throw error;
    }
  },

  // Search keywords by text
  searchKeywords: async (searchText) => {
    try {
      const allKeywords = await keywordService.getAllKeywords();

      if (!searchText) {
        return allKeywords;
      }

      const searchLower = searchText.toLowerCase();
      return allKeywords
        .filter(item =>
          item.keyword.toLowerCase().includes(searchLower) &&
          item.isActive !== false
        )
        .sort((a, b) => {
          // Sort by relevance - exact matches first, then partial matches
          const aKeyword = a.keyword.toLowerCase();
          const bKeyword = b.keyword.toLowerCase();

          if (aKeyword.startsWith(searchLower) && !bKeyword.startsWith(searchLower)) return -1;
          if (!aKeyword.startsWith(searchLower) && bKeyword.startsWith(searchLower)) return 1;

          return aKeyword.localeCompare(bKeyword);
        });
    } catch (error) {
      console.error('Error searching keywords:', error);
      return [];
    }
  }
};