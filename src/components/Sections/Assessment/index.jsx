import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QuizComponent from './QuizComponent';
import quizQuestions from '../../../assets/mockData/quizQuestions';
import styles from './styles.module.css';

const CategoryCard = ({ category, icon, description, isSelected, onClick }) => {
  const iconMap = {
    mindfulness: "😌",
    sun: "☀️",
    moon: "🌙",
    target: "🎯"
  };

  return (
    <motion.div
      className={`${styles.categoryCard} ${isSelected ? styles.selectedCategory : ''}`}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className={styles.categoryIcon}>
        {iconMap[icon] || "🧠"}
      </div>
      <h3 className={styles.categoryTitle}>{category}</h3>
      <p className={styles.categoryDescription}>{description}</p>
    </motion.div>
  );
};

const Assessment = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [lastResults, setLastResults] = useState(null);

  useEffect(() => {
    // Load last results from localStorage for insights
    const savedResults = JSON.parse(localStorage.getItem('assessment_results') || '[]');
    if (savedResults.length > 0) {
      setLastResults(savedResults[savedResults.length - 1]);
    }
    
    // If we have a category in the URL query parameter, select it
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      const matchingQuiz = quizQuestions.find(q => 
        q.category.toLowerCase() === categoryParam.toLowerCase()
      );
      if (matchingQuiz) {
        handleSelectCategory(matchingQuiz.id);
      }
    }
  }, []);

  const handleSelectCategory = (categoryId) => {
    const selected = quizQuestions.find(q => q.id === categoryId);
    if (selected) {
      setSelectedCategory(categoryId);
      setSelectedQuiz(selected);
    }
  };

  const handleChangeCategory = () => {
    setSelectedCategory(null);
    setSelectedQuiz(null);
  };

  const handleQuizComplete = (result) => {
    setLastResults({
      category: selectedQuiz.category,
      date: new Date().toISOString(),
      result
    });
  };

  return (
    <section className={styles.assessmentSection}>
      <div className={styles.assessmentContainer}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.sectionTitle}>
            Self-Assessment
          </h1>
          <p className={styles.sectionDescription}>
            Take a moment to reflect on different aspects of your mental wellbeing.
            These brief assessments can help you gain insights and track your progress over time.
          </p>
        </motion.div>

        {!selectedQuiz ? (
          <div className={styles.categoriesContainer}>
            <h2 className={styles.chooseTitle}>Choose an assessment category:</h2>
            <div className={styles.categoryGrid}>
              {quizQuestions.map((quiz, index) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <CategoryCard
                    category={quiz.category}
                    icon={quiz.icon}
                    description={quiz.description}
                    isSelected={selectedCategory === quiz.id}
                    onClick={() => handleSelectCategory(quiz.id)}
                  />
                </motion.div>
              ))}
            </div>
            
            {lastResults && (
              <motion.div 
                className={styles.lastResultBanner}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <p>
                  Your last assessment: <strong>{lastResults.category}</strong> on{' '}
                  {new Date(lastResults.date).toLocaleDateString()}
                </p>
                <p>
                  Result: <span className={styles.resultHighlight}>{lastResults.result.heading}</span>
                </p>
              </motion.div>
            )}
          </div>
        ) : (
          <QuizComponent 
            quizData={selectedQuiz}
            onComplete={handleQuizComplete}
            onChangeCategory={handleChangeCategory}
          />
        )}
      </div>
    </section>
  );
};

export default Assessment;