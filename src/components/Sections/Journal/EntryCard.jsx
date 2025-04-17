import React from 'react';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import Card from '../../UI/Card';

const EntryCard = ({ entry, onClick }) => {
  const { text, mood, tags, timestamp } = entry;
  
  // Format date for display
  const formattedDate = new Date(timestamp).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short', 
    day: 'numeric'
  });

  // Format time for display
  const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Truncate text if too long
  const truncatedText = text.length > 120 
    ? `${text.substring(0, 120)}...` 
    : text;

  return (
    <Card className="mb-4 cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-3">{mood}</span>
            <div>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar size={14} className="mr-1" />
                <span>{formattedDate}</span>
                <span className="mx-1">•</span>
                <span>{formattedTime}</span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-3">{truncatedText}</p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => (
              <div key={tag} className="bg-blue-50 text-blue-600 rounded-full px-2 py-1 text-xs flex items-center">
                <Tag size={10} className="mr-1" />
                {tag}
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-end mt-2">
          <button className="text-blue-500 hover:text-blue-700 flex items-center text-sm">
            Read more
            <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default EntryCard;