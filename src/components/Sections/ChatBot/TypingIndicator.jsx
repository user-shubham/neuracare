import styles from './styles.module.css';

const TypingIndicator = () => {
  return (
    <div className={styles.typingIndicator}>
      <div className={styles.botAvatarSmall}>🧠</div>
      <div className={styles.typingDots}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default TypingIndicator;