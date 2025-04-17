// src/components/Sections/MoodLog/index.jsx
import React from 'react';
import { motion } from 'framer-motion';
import MoodSelector from './MoodSelector';
import MoodTimeline from './MoodTimeline';
import { useMoodTracker } from '../../../hooks/useMoodTracker';
import styles from './styles.module.css';

const MoodLog = () => {
  const { moods, addMood } = useMoodTracker();

  const handleMoodSubmit = (moodData) => {
    addMood({
      ...moodData,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <motion.section 
      className={styles.moodLogSection}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Track Your Mood Daily</h2>
        <p className={styles.sectionSubtitle}>How are you feeling today?</p>
      </div>

      <MoodSelector onMoodSubmit={handleMoodSubmit} />
      
      {moods.length > 0 && (
        <div className={styles.timelineContainer}>
          <h3 className={styles.timelineTitle}>Your Mood History</h3>
          <MoodTimeline moods={moods} />
        </div>
      )}
    </motion.section>
  );
};

export default MoodLog;