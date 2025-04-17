// src/components/Sections/Insights/TrendsSummary.jsx
import { motion } from 'framer-motion';
import { assessmentScores } from '../../../assets/mockData/insights';

const TrendsSummary = ({ timeframe }) => {
  // Calculate improvement metrics based on assessment data
  const latestScores = assessmentScores[assessmentScores.length - 1];
  const earliestScores = assessmentScores[0];
  
  const improvementCalc = (metric) => {
    const change = latestScores[metric] - earliestScores[metric];
    const isPositive = metric === 'anxiety' || metric === 'depression' ? change < 0 : change > 0;
    const percentChange = Math.abs(change) / earliestScores[metric] * 100;
    return {
      change: Math.abs(change),
      percent: percentChange.toFixed(0),
      trend: isPositive ? 'improved' : 'worsened'
    };
  };

  const metrics = {
    anxiety: improvementCalc('anxiety'),
    depression: improvementCalc('depression'),
    sleep: improvementCalc('sleep'),
    energy: improvementCalc('energy')
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="py-2">
      <p className="text-gray-600 mb-6">
        Based on your {timeframe} data, here's a summary of your progress over the past month:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div 
          className={`p-4 rounded-lg bg-gradient-to-br ${
            metrics.anxiety.trend === 'improved' ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'
          }`}
          variants={cardVariants}
        >
          <h4 className="font-medium text-gray-800">Anxiety</h4>
          <p className={`text-2xl font-bold ${
            metrics.anxiety.trend === 'improved' ? 'text-green-600' : 'text-red-600'
          }`}>
            {metrics.anxiety.trend === 'improved' ? '↓' : '↑'} {metrics.anxiety.change} points
          </p>
          <p className="text-sm text-gray-600">
            {metrics.anxiety.percent}% {metrics.anxiety.trend} from baseline
          </p>
        </motion.div>
        
        <motion.div 
          className={`p-4 rounded-lg bg-gradient-to-br ${
            metrics.depression.trend === 'improved' ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'
          }`}
          variants={cardVariants}
        >
          <h4 className="font-medium text-gray-800">Depression</h4>
          <p className={`text-2xl font-bold ${
            metrics.depression.trend === 'improved' ? 'text-green-600' : 'text-red-600'
          }`}>
            {metrics.depression.trend === 'improved' ? '↓' : '↑'} {metrics.depression.change} points
          </p>
          <p className="text-sm text-gray-600">
            {metrics.depression.percent}% {metrics.depression.trend} from baseline
          </p>
        </motion.div>
        
        <motion.div 
          className={`p-4 rounded-lg bg-gradient-to-br ${
            metrics.sleep.trend === 'improved' ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'
          }`}
          variants={cardVariants}
        >
          <h4 className="font-medium text-gray-800">Sleep Quality</h4>
          <p className={`text-2xl font-bold ${
            metrics.sleep.trend === 'improved' ? 'text-green-600' : 'text-red-600'
          }`}>
            {metrics.sleep.trend === 'improved' ? '↑' : '↓'} {metrics.sleep.change} points
          </p>
          <p className="text-sm text-gray-600">
            {metrics.sleep.percent}% {metrics.sleep.trend} from baseline
          </p>
        </motion.div>
        
        <motion.div 
          className={`p-4 rounded-lg bg-gradient-to-br ${
            metrics.energy.trend === 'improved' ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'
          }`}
          variants={cardVariants}
        >
          <h4 className="font-medium text-gray-800">Energy Level</h4>
          <p className={`text-2xl font-bold ${
            metrics.energy.trend === 'improved' ? 'text-green-600' : 'text-red-600'
          }`}>
            {metrics.energy.trend === 'improved' ? '↑' : '↓'} {metrics.energy.change} points
          </p>
          <p className="text-sm text-gray-600">
            {metrics.energy.percent}% {metrics.energy.trend} from baseline
          </p>
        </motion.div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Monthly Insights</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Your anxiety scores have steadily improved over the past 4 weeks</li>
          <li>Sleep quality shows the most significant improvement (+50%)</li>
          <li>Days with journaling entries correlate with better mood the following day</li>
          <li>Exercise sessions are associated with energy level improvements of +1.2 points on average</li>
        </ul>
      </div>
    </div>
  );
};

export default TrendsSummary;