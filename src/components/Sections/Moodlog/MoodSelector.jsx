// src/components/Sections/MoodLog/MoodSelector.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.css';

const moods = [
  { name: 'Happy', emoji: '😊', color: '#FFD700' },
  { name: 'Calm', emoji: '😌', color: '#90EE90' },
  { name: 'Neutral', emoji: '😐', color: '#E0E0E0' },
  { name: 'Sad', emoji: '😢', color: '#ADD8E6' },
  { name: 'Anxious', emoji: '😰', color: '#FFA07A' },
  { name: 'Angry', emoji: '😠', color: '#FF6347' },
  { name: 'Tired', emoji: '😴', color: '#D8BFD8' },
  { name: 'Excited', emoji: '🤩', color: '#FF69B4' },
];

const MoodSelector = ({ onMoodSubmit }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [intensity, setIntensity] = useState(5);
  const [journalEntry, setJournalEntry] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    setIsPopupOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onMoodSubmit({
      mood: selectedMood.name,
      emoji: selectedMood.emoji,
      intensity,
      journalEntry,
    });
    
    // Reset form
    setJournalEntry('');
    setIntensity(5);
    setIsPopupOpen(false);
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className={styles.moodSelectorContainer}>
      <div className={styles.moodGrid}>
        {moods.map((mood) => (
          <motion.button
            key={mood.name}
            className={styles.moodButton}
            style={{ backgroundColor: mood.color }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMoodClick(mood)}
          >
            <span className={styles.moodEmoji}>{mood.emoji}</span>
            <span className={styles.moodName}>{mood.name}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {isPopupOpen && selectedMood && (
          <motion.div 
            className={styles.popupOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.popupContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className={styles.popupTitle}>
                <span className={styles.popupEmoji}>{selectedMood.emoji}</span>
                {selectedMood.name}
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="intensity" className={styles.label}>
                    Intensity (1-10): {intensity}
                  </label>
                  <input
                    type="range"
                    id="intensity"
                    min="1"
                    max="10"
                    value={intensity}
                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                    className={styles.intensitySlider}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="journalEntry" className={styles.label}>
                    Journal Entry (optional):
                  </label>
                  <textarea
                    id="journalEntry"
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    placeholder="How are you feeling? What's on your mind?"
                    className={styles.journalInput}
                  />
                </div>
                
                <div className={styles.buttonGroup}>
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={styles.saveButton}
                  >
                    Save Mood
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoodSelector;