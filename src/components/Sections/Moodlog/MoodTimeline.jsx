// src/components/Sections/MoodLog/MoodTimeline.jsx
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

const MoodTimeline = ({ moods }) => {
  const scrollRef = useRef(null);
  
  // Sort moods by timestamp, most recent first
  const sortedMoods = [...moods].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.timelineWrapper}>
      <button 
        className={`${styles.scrollButton} ${styles.leftButton}`}
        onClick={scrollLeft}
        aria-label="Scroll left"
      >
        ‹
      </button>
      
      <div className={styles.timelineScroll} ref={scrollRef}>
        {sortedMoods.length > 0 ? (
          sortedMoods.map((moodEntry, index) => (
            <motion.div
              key={moodEntry.timestamp}
              className={styles.moodCard}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <div className={styles.moodCardHeader}>
                <span className={styles.moodEmoji}>{moodEntry.emoji}</span>
                <span className={styles.moodName}>{moodEntry.mood}</span>
                <span className={styles.moodIntensity}>
                  {Array(moodEntry.intensity).fill('•').join('')}
                </span>
              </div>
              
              <div className={styles.moodTime}>
                {formatDate(moodEntry.timestamp)}
              </div>
              
              {moodEntry.journalEntry && (
                <p className={styles.journalPreview}>
                  {moodEntry.journalEntry.length > 100 
                    ? `${moodEntry.journalEntry.substring(0, 100)}...` 
                    : moodEntry.journalEntry}
                </p>
              )}
            </motion.div>
          ))
        ) : (
          <p className={styles.emptyMessage}>No mood entries yet.</p>
        )}
      </div>
      
      <button 
        className={`${styles.scrollButton} ${styles.rightButton}`}
        onClick={scrollRight}
        aria-label="Scroll right"
      >
        ›
      </button>
    </div>
  );
};

export default MoodTimeline;