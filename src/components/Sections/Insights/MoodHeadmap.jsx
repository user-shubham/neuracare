// src/components/Sections/Insights/MoodHeatmap.jsx
import { useState } from 'react';
import { weeklyMoodHeatmap } from '../../../assets/mockData/insights';

const MoodHeatmap = () => {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Function to determine cell color based on mood score
  const getMoodColor = (score) => {
    if (score >= 4.5) return 'bg-green-400';
    if (score >= 4.0) return 'bg-green-300';
    if (score >= 3.5) return 'bg-green-200';
    if (score >= 3.0) return 'bg-yellow-200';
    if (score >= 2.5) return 'bg-yellow-300';
    if (score >= 2.0) return 'bg-orange-300';
    return 'bg-orange-400';
  };

  const getMoodLabel = (score) => {
    if (score >= 4.5) return 'Excellent';
    if (score >= 4.0) return 'Very Good';
    if (score >= 3.5) return 'Good';
    if (score >= 3.0) return 'Fair';
    if (score >= 2.5) return 'Below Average';
    if (score >= 2.0) return 'Poor';
    return 'Very Poor';
  };

  return (
    <div className="overflow-x-auto">
      <div className="relative">
        {hoveredCell && (
          <div 
            className="absolute bg-white shadow-lg rounded-md p-3 z-10 text-sm"
            style={{ 
              top: hoveredCell.top - 80, 
              left: hoveredCell.left - 20 
            }}
          >
            <p className="font-medium text-gray-800">{hoveredCell.day} - {hoveredCell.time}</p>
            <p className="text-gray-600">Mood: {getMoodLabel(hoveredCell.score)} ({hoveredCell.score})</p>
          </div>
        )}
        
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                Day / Time
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-center text-sm font-medium text-gray-700">
                Morning
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-center text-sm font-medium text-gray-700">
                Afternoon
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-center text-sm font-medium text-gray-700">
                Evening
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-center text-sm font-medium text-gray-700">
                Night
              </th>
            </tr>
          </thead>
          <tbody>
            {weeklyMoodHeatmap.map((dayData, index) => (
              <tr key={dayData.day} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-2 px-4 border-b border-gray-200 text-sm font-medium text-gray-700">
                  {dayData.day}
                </td>
                {['morning', 'afternoon', 'evening', 'night'].map((time) => {
                  const score = dayData[time];
                  return (
                    <td 
                      key={`${dayData.day}-${time}`} 
                      className={`py-2 px-4 border-b border-gray-200 text-center cursor-pointer ${getMoodColor(score)}`}
                      onMouseEnter={(e) => {
                        const rect = e.target.getBoundingClientRect();
                        setHoveredCell({
                          day: dayData.day,
                          time: time.charAt(0).toUpperCase() + time.slice(1),
                          score,
                          top: rect.top + window.scrollY,
                          left: rect.left + rect.width / 2 + window.scrollX
                        });
                      }}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <span className="text-sm font-medium">{score.toFixed(1)}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <div className="text-xs text-gray-600 mr-2">Mood Scale:</div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-400 rounded"></div>
          <span className="ml-1 text-xs text-gray-600">Very Poor</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-300 rounded"></div>
          <span className="ml-1 text-xs text-gray-600">Poor</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-300 rounded"></div>
          <span className="ml-1 text-xs text-gray-600">Below Average</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-200 rounded"></div>
          <span className="ml-1 text-xs text-gray-600">Fair</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-200 rounded"></div>
          <span className="ml-1 text-xs text-gray-600">Good</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-300 rounded"></div>
          <span className="ml-1 text-xs text-gray-600">Very Good</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-400 rounded"></div>
          <span className="ml-1 text-xs text-gray-600">Excellent</span>
        </div>
      </div>
    </div>
  );
};

export default MoodHeatmap;