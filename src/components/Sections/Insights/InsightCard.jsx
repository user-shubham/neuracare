// src/components/Sections/Insights/InsightCard.jsx
import { motion } from 'framer-motion';
import Card from '../../UI/Card';

const InsightCard = ({ title, children, className = '' }) => {
  return (
    <Card className={`p-6 h-full overflow-hidden ${className}`}>
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
        <div className="flex-grow">
          {children}
        </div>
      </div>
    </Card>
  );
};

export default InsightCard;