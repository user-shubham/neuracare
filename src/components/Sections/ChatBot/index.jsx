import { useEffect, useState } from 'react';
import ChatInterface from './ChatInterface';
import styles from './styles.module.css';

const ChatBot = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.chatbotSection}>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold mb-3">AI Wellness Companion</h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600">
            Express yourself freely and receive supportive guidance from your personal wellness assistant.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <ChatInterface isLoading={isLoading} />
        </div>
      </div>
    </section>
  );
};

export default ChatBot;