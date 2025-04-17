// src/hooks/useMoodTracker.js
import { useState, useEffect } from 'react';

export const useMoodTracker = () => {
  const [moods, setMoods] = useState([]);

  // Load moods from localStorage on component mount
  useEffect(() => {
    const savedMoods = localStorage.getItem('moodEntries');
    if (savedMoods) {
      try {
        setMoods(JSON.parse(savedMoods));
      } catch (error) {
        console.error('Error parsing saved moods:', error);
        // If there's an error parsing, start with empty array
        localStorage.removeItem('moodEntries');
      }
    }
  }, []);

  // Save moods to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moods));
  }, [moods]);

  const addMood = (moodData) => {
    setMoods(prevMoods => [moodData, ...prevMoods]);
  };

  const deleteMood = (timestamp) => {
    setMoods(prevMoods => prevMoods.filter(mood => mood.timestamp !== timestamp));
  };

  const clearAllMoods = () => {
    setMoods([]);
    localStorage.removeItem('moodEntries');
  };

  return {
    moods,
    addMood,
    deleteMood,
    clearAllMoods
  };
};