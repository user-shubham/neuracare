import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionCard from './QuestionCard';
import ResultScreen from './ResultScreen';
import Button from '../../UI/Button';
import styles from './styles.module.css';

const QuizComponent = ({ quizData, onComplete, onChangeCategory }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState(null);

  const questions = quizData.questions;
  
  // Save progress to localStorage
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(`quiz_progress_${quizData.id}`, JSON.stringify({
        answers,
        currentQuestionIndex
      }));
    }
  }, [answers, currentQuestionIndex, quizData.id]);
  
  // Try to load saved progress
  useEffect(() => {
    const savedProgress = localStorage.getItem(`quiz_progress_${quizData.id}`);
    if (savedProgress) {
      try {
        const { answers: savedAnswers, currentQuestionIndex: savedIndex } = JSON.parse(savedProgress);
        setAnswers(savedAnswers);
        setCurrentQuestionIndex(savedIndex);
      } catch (e) {
        console.error("Failed to parse saved quiz progress");
      }
    }
  }, [quizData.id]);

  const handleAnswer = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateResult = () => {
    let totalScore = 0;
    
    Object.entries(answers).forEach(([questionId, answerIndex]) => {
      const question = questions.find(q => q.id === questionId);
      if (question) {
        totalScore += question.options[answerIndex].score;
      }
    });
    
    // Find the appropriate result based on score
    const matchingResult = quizData.results.find(r => 
      totalScore >= r.range[0] && totalScore <= r.range[1]
    );
    
    return matchingResult;
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const calculatedResult = calculateResult();
      setResult(calculatedResult);
      setShowResults(true);
      
      // Save result to localStorage for insights section
      const savedResults = JSON.parse(localStorage.getItem('assessment_results') || '[]');
      const newResult = {
        id: Date.now(),
        category: quizData.category,
        date: new Date().toISOString(),
        result: calculatedResult
      };
      localStorage.setItem('assessment_results', JSON.stringify([...savedResults, newResult]));
      
      if (onComplete) {
        onComplete(calculatedResult);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    localStorage.removeItem(`quiz_progress_${quizData.id}`);
  };

  const getProgress = () => {
    return ((Object.keys(answers).length / questions.length) * 100).toFixed(0);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered = currentQuestion && answers[currentQuestion.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  if (showResults && result) {
    return (
      <ResultScreen 
        result={result} 
        category={quizData.category}
        onRetake={handleRetake}
        onChangeCategory={onChangeCategory}
      />
    );
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeader}>
        <h2 className={styles.quizTitle}>{quizData.category} Assessment</h2>
        <div className={styles.progressContainer}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${getProgress()}%` }}
          />
          <span className={styles.progressText}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
      </div>

      <div className={styles.questionsContainer}>
        <AnimatePresence mode="wait">
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              onAnswer={handleAnswer}
              selectedAnswer={answers[question.id]}
              isActive={index === currentQuestionIndex}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className={styles.navigationButtons}>
        {currentQuestionIndex > 0 && (
          <Button 
            onClick={handlePrevious}
            variant="outline"
          >
            Previous
          </Button>
        )}
        
        <Button 
          onClick={handleNext}
          disabled={!isAnswered}
        >
          {isLastQuestion ? 'See Results' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
};

export default QuizComponent;