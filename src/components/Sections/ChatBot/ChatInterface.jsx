import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Card from '../../UI/Card';
import styles from './styles.module.css';

// Mock AI response function (to be replaced with actual API call later)
const getAIResponse = async (message) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  const responses = [
    "I understand how you're feeling. Would you like to talk more about that?",
    "Thank you for sharing. How long have you been experiencing these feelings?",
    "That sounds challenging. What do you think triggered these emotions?",
    "I'm here to listen. Have you tried any coping strategies so far?",
    "Your feelings are valid. Let's explore some ways to help you feel better.",
    "I'm curious - how does this compare to how you felt last week?",
    "It takes courage to share these thoughts. What would help you feel supported right now?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const ChatInterface = ({ isLoading }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Load chat history from localStorage on initial load
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Error parsing saved messages:', e);
      }
    } else {
      // Initialize with welcome message
      const welcomeMessage = {
        id: uuidv4(),
        sender: 'bot',
        text: "Hello! I'm your wellness companion. How are you feeling today?",
        timestamp: Date.now()
      };
      setMessages([welcomeMessage]);
    }
  }, []);
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Auto-focus input field when component loads
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: uuidv4(),
      sender: 'user',
      text: inputValue,
      timestamp: Date.now(),
      mood: selectedMood
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setSelectedMood(null);
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Get AI response (mock for now)
      const response = await getAIResponse(inputValue);
      
      // Add AI response
      const botMessage = {
        id: uuidv4(),
        sender: 'bot',
        text: response,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMessage = {
        id: uuidv4(),
        sender: 'bot',
        text: "I'm having trouble connecting right now. Could you try again?",
        timestamp: Date.now(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const moodOptions = [
    { id: 'happy', emoji: '😊', label: 'Happy' },
    { id: 'sad', emoji: '😢', label: 'Sad' },
    { id: 'angry', emoji: '😡', label: 'Angry' },
    { id: 'anxious', emoji: '😰', label: 'Anxious' },
    { id: 'neutral', emoji: '😐', label: 'Neutral' }
  ];
  
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood === selectedMood ? null : mood);
  };
  
  const handleFeedback = (messageId, isPositive) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, feedback: isPositive ? 'positive' : 'negative' } 
          : msg
      )
    );
  };
  
  const clearChat = () => {
    // Keep only the welcome message
    const welcomeMessage = {
      id: uuidv4(),
      sender: 'bot',
      text: "Hello! I'm your wellness companion. How are you feeling today?",
      timestamp: Date.now()
    };
    setMessages([welcomeMessage]);
  };
  
  return (
    <Card className={styles.chatCard}>
      <div className={styles.chatHeader}>
        <div className={styles.botInfo}>
          <div className={styles.botAvatar}>🧠</div>
          <div>
            <h3 className="font-medium">Wellness Assistant</h3>
            <span className={styles.statusIndicator}>
              <span className={styles.statusDot}></span>
              <span className="text-sm text-green-600">Online</span>
            </span>
          </div>
        </div>
        <button 
          onClick={clearChat} 
          className="text-gray-500 hover:text-gray-700 transition-colors"
          title="Clear chat history"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      <div className={styles.chatMessages}>
        {messages.map(message => (
          <MessageBubble 
            key={message.id}
            message={message}
            onFeedback={handleFeedback}
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className={styles.moodSelector}>
        {moodOptions.map(mood => (
          <button
            key={mood.id}
            className={`${styles.moodButton} ${selectedMood === mood.id ? styles.selectedMood : ''}`}
            onClick={() => handleMoodSelect(mood.id)}
            title={mood.label}
          >
            <span role="img" aria-label={mood.label}>{mood.emoji}</span>
          </button>
        ))}
      </div>
      
      <div className={styles.chatInput}>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Type your message here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.messageInput}
        />
        <Button 
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
          className={styles.sendButton}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </Button>
      </div>
    </Card>
  );
};

export default ChatInterface;