import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import Button from '../../UI/Button';

const getEmojiForLevel = (level) => {
  switch (level) {
    case 'Low':
      return '😊';
    case 'Moderate':
      return '😐';
    case 'High':
      return '😟';
    default:
      return '🤔';
  }
};

const ResultScreen = ({ result, category, onRetake, onChangeCategory }) => {
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  const emoji = getEmojiForLevel(result.level);
  
  return (
    <motion.div 
      className={styles.resultScreen}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.resultHeader}>
        <span className={styles.resultEmoji}>{emoji}</span>
        <h2 className={styles.resultHeading}>{result.heading}</h2>
      </div>
      
      <motion.div 
        className={styles.resultMeter}
        initial={{ width: 0 }}
        animate={{ width: `${(result.range[0] / 15) * 100}%` }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div 
          className={`${styles.resultLevel} ${styles[result.level.toLowerCase()]}`}
          style={{ width: `${((result.range[1] - result.range[0]) / 15) * 100}%` }}
        />
      </motion.div>
      
      <p className={styles.resultDescription}>{result.description}</p>
      
      <div className={styles.resultTabs}>
        <button 
          className={`${styles.resultTab} ${showSuggestions ? styles.activeTab : ''}`}
          onClick={() => setShowSuggestions(true)}
        >
          Suggestions
        </button>
        <button 
          className={`${styles.resultTab} ${!showSuggestions ? styles.activeTab : ''}`}
          onClick={() => setShowSuggestions(false)}
        >
          About {category}
        </button>
      </div>
      
      {showSuggestions ? (
        <motion.div 
          className={styles.suggestionsContainer}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3>Recommended Next Steps</h3>
          <ul className={styles.suggestionsList}>
            {result.suggestions.map((suggestion, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                {suggestion}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ) : (
        <motion.div 
          className={styles.categoryInfo}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p>
            {category === "Anxiety" && 
              "Anxiety is your body's natural response to stress. Understanding your anxiety patterns can help you develop coping strategies."}
            {category === "Mood" && 
              "Your mood affects how you experience and interact with the world. Recognizing mood patterns is the first step to emotional balance."}
            {category === "Sleep" && 
              "Quality sleep is essential for mental and physical wellbeing. Small adjustments to sleep habits can lead to significant improvements."}
            {category === "Focus" && 
              "Focus challenges can impact productivity and satisfaction. Learning attention management techniques can improve your daily experience."}
          </p>
        </motion.div>
      )}
      
      <div className={styles.resultActions}>
        <Button onClick={onRetake}>
          Retake Assessment
        </Button>
        <Button onClick={onChangeCategory} variant="outline">
          Try Different Category
        </Button>
      </div>
    </motion.div>
  );
};

export default ResultScreen;