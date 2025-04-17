// src/components/Sections/Insights/index.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import InsightCard from './InsightCard';
import TrendsSummary from './TrendsSummary';
import MoodHeatmap from './MoodHeatmap';
import WordCloud from './WordCloud';
import ChartRenderer from './ChartRenderer';
import { insightMessages, emotionFrequency, weeklyMoodAverage, triggerFrequency } from '../../../assets/mockData/insights';
import Card from '../../UI/Card';
import Toggle from '../../UI/Toggle';
import Loader from '../../UI/Loader';

const InsightsSection = () => {
  const [timeframe, setTimeframe] = useState('weekly');
  const [isLoading, setIsLoading] = useState(false);

  const handleTimeframeChange = (newTimeframe) => {
    setIsLoading(true);
    // Simulate data loading
    setTimeout(() => {
      setTimeframe(newTimeframe);
      setIsLoading(false);
    }, 600);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="w-full py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Mental Wellness Insights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Personalized patterns and trends based on your mood tracking, journaling, and assessments.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 p-1 rounded-lg">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                timeframe === 'daily' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
              onClick={() => handleTimeframeChange('daily')}
            >
              Daily
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                timeframe === 'weekly' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
              onClick={() => handleTimeframeChange('weekly')}
            >
              Weekly
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                timeframe === 'monthly' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-blue-500'
              }`}
              onClick={() => handleTimeframeChange('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Key Insights Summary */}
            <motion.div className="lg:col-span-3" variants={itemVariants}>
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {insightMessages.slice(0, 3).map((insight, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-4 shadow-sm">
                      <p className="text-gray-700">{insight}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Mood Trends Chart */}
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <InsightCard title="Mood Trends">
                <ChartRenderer 
                  type="line" 
                  data={weeklyMoodAverage} 
                  xKey="week" 
                  yKey="average" 
                  timeframe={timeframe} 
                />
              </InsightCard>
            </motion.div>

            {/* Emotion Distribution */}
            <motion.div variants={itemVariants}>
              <InsightCard title="Emotion Distribution">
                <ChartRenderer 
                  type="pie" 
                  data={emotionFrequency} 
                  nameKey="emotion" 
                  dataKey="count" 
                  colorKey="color" 
                />
              </InsightCard>
            </motion.div>

            {/* Common Triggers */}
            <motion.div variants={itemVariants}>
              <InsightCard title="Common Triggers">
                <ChartRenderer 
                  type="bar" 
                  data={triggerFrequency} 
                  xKey="trigger" 
                  yKey="count" 
                />
              </InsightCard>
            </motion.div>

            {/* Word Cloud from Journal */}
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <InsightCard title="Journal Keywords">
                <WordCloud />
              </InsightCard>
            </motion.div>

            {/* Mood Heatmap */}
            <motion.div className="lg:col-span-3" variants={itemVariants}>
              <InsightCard title="Weekly Mood Patterns">
                <MoodHeatmap />
              </InsightCard>
            </motion.div>

            {/* Trends Summary */}
            <motion.div className="lg:col-span-3" variants={itemVariants}>
              <InsightCard title="Monthly Wellness Summary">
                <TrendsSummary timeframe={timeframe} />
              </InsightCard>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default InsightsSection;