import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import JournalEntry from './JournalEntry';
import JournalHistory from './JournalHistory';
import { BookOpen, TrendingUp } from 'lucide-react';

const Journal = () => {
  const [entries, setEntries] = useLocalStorage('user_journal_entries', []);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [activeTab, setActiveTab] = useState('write');

  // Simulate loading entries from storage
  useEffect(() => {
    setTimeout(() => {
      setLoadingEntries(false);
    }, 800);
  }, []);

  const handleSaveEntry = (newEntry) => {
    // Add new entry to the beginning of the array
    setEntries([newEntry, ...entries]);
    
    // Show a success message
    // Note: In a real implementation, you might want to use a toast notification
    alert('Journal entry saved successfully!');
  };

  // Sort entries by timestamp, newest first
  const sortedEntries = [...entries].sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  // Calculate basic stats
  const totalEntries = entries.length;
  const entriesThisWeek = entries.filter(entry => {
    const entryDate = new Date(entry.timestamp);
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - 7));
    return entryDate >= weekStart;
  }).length;

  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Your Personal Journal
            </h2>
            <p className="text-lg text-gray-600">
              A safe space to reflect on your thoughts and feelings
            </p>
          </div>

          {/* Quick stats */}
          {totalEntries > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">{totalEntries}</p>
                <p className="text-sm text-gray-600">Total Entries</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                <p className="text-3xl font-bold text-green-600">{entriesThisWeek}</p>
                <p className="text-sm text-gray-600">This Week</p>
              </div>
            </div>
          )}

          {/* Tab navigation */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              className={`flex items-center py-4 px-6 ${
                activeTab === 'write'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('write')}
            >
              <BookOpen size={18} className="mr-2" />
              Write Entry
            </button>
            <button
              className={`flex items-center py-4 px-6 ${
                activeTab === 'history'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('history')}
            >
              <TrendingUp size={18} className="mr-2" />
              Journal History
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'write' && (
            <div className="mb-12">
              <div className="animate-fadeIn">
                <JournalEntry onSave={handleSaveEntry} />
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="mb-12">
              {loadingEntries ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="animate-fadeIn">
                  <JournalHistory entries={sortedEntries} />
                </div>
              )}
            </div>
          )}

          {/* Journal tips */}
          <div className="bg-blue-50 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-medium text-blue-800 mb-3">
              Journaling Tips
            </h3>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Write freely without worrying about grammar or spelling</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Try to journal at the same time each day to build a habit</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Be honest with yourself - this is your private space</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Use tags to track recurring themes in your entries</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journal;