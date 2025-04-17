import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

const QuestionCard = ({ question, onAnswer, selectedAnswer, isActive }) => {
  const [localAnswer, setLocalAnswer] = useState(selectedAnswer);
  
  useEffect(() => {
    setLocalAnswer(selectedAnswer);
  }, [selectedAnswer]);

  const handleSelect = (optionIndex) => {
    setLocalAnswer(optionIndex);
    onAnswer(question.id, optionIndex);
  };

  if (!isActive) return null;

  return (
    <motion.div
      className={styles.questionCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className={styles.questionText}>{question.text}</h3>
      <div className={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            className={`${styles.optionButton} ${localAnswer === index ? styles.selectedOption : ''}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(index)}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionCard;