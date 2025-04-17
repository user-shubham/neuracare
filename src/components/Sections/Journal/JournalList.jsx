import { useState } from 'react';
import { Book, Edit, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './styles.module.css';

const JournalList = ({ entries, onEditEntry }) => {
  const [expandedId, setExpandedId] = useState(null);

  if (!entries || entries.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Book size={48} />
        <p>No journal entries yet. Create your first entry!</p>
      </div>
    );
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Get emoji for mood
  const getMoodEmoji = (mood) => {
    const moods = {
      happy: '😊',
      sad: '😢',
      anxious: '😰',
      calm: '😌',
      angry: '😠',
      neutral: '😐',
      excited: '🤩',
      tired: '😴'
    };
    return mood ? moods[mood] || '📝' : '📝';
  };

  // Format date to be more readable
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric', 
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined 
      });
    }
  };

  return (
    <div className={styles.journalList}>
      {entries.map((entry) => (
        <div key={entry.id} className={styles.entryCard}>
          <div 
            className={styles.entryPreview} 
            onClick={() => toggleExpand(entry.id)}
          >
            <div className={styles.entryIcon}>
              {getMoodEmoji(entry.mood)}
            </div>
            <div className={styles.entryInfo}>
              <h3 className={styles.entryPreviewTitle}>
                {entry.title || 'Untitled Entry'}
              </h3>
              <p className={styles.entryDate}>
                {formatDate(entry.timestamp)}
              </p>
            </div>
            <div className={styles.entryActions}>
              <button 
                className={styles.editButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onEditEntry(entry);
                }}
              >
                <Edit size={16} />
              </button>
              {expandedId === entry.id ? 
                <ChevronUp size={16} /> : 
                <ChevronDown size={16} />
              }
            </div>
          </div>
          
          {expandedId === entry.id && (
            <div className={styles.expandedContent}>
              <p>{entry.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JournalList;