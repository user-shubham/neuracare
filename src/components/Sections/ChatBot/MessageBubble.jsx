import { useState } from 'react';
import styles from './styles.module.css';

const MessageBubble = ({ message, onFeedback }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  
  const { id, sender, text, timestamp, mood, feedback, isError } = message;
  const isUser = sender === 'user';
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getMoodEmoji = (mood) => {
    const emojis = {
      'happy': '😊',
      'sad': '😢',
      'angry': '😡',
      'anxious': '😰',
      'neutral': '😐'
    };
    return emojis[mood] || '';
  };
  
  return (
    <div 
      className={`${styles.messageBubble} ${isUser ? styles.userMessage : styles.botMessage}`}
      onMouseEnter={() => !isUser && setShowFeedback(true)}
      onMouseLeave={() => setShowFeedback(false)}
    >
      <div className={styles.messageContent}>
        {isUser && mood && (
          <span className={styles.moodIndicator}>
            {getMoodEmoji(mood)}
          </span>
        )}
        
        <div 
          className={`${styles.messageText} ${isError ? styles.errorMessage : ''}`}
        >
          {text}
          
          {!isUser && showFeedback && !feedback && (
            <div className={styles.feedbackButtons}>
              <button 
                onClick={() => onFeedback(id, true)} 
                className={styles.feedbackButton}
                title="This was helpful"
              >
                👍
              </button>
              <button 
                onClick={() => onFeedback(id, false)} 
                className={styles.feedbackButton}
                title="This wasn't helpful"
              >
                👎
              </button>
            </div>
          )}
          
          {!isUser && feedback && (
            <div className={styles.feedbackSubmitted}>
              {feedback === 'positive' ? '👍 Thank you for your feedback' : '👎 Thanks, we\'ll try to improve'}
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.messageTime}>
        {formatTime(timestamp)}
      </div>
    </div>
  );
};

export default MessageBubble;