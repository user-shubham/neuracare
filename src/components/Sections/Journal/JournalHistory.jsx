import React, { useState } from 'react';
import { Search, Filter, X, Calendar } from 'lucide-react';
import EntryCard from './EntryCard';
import Modal from '../../UI/Modal';
import Input from '../../UI/Input';
import Button from '../../UI/Button';

const JournalHistory = ({ entries }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get all unique tags from entries
  const allTags = [...new Set(entries.flatMap(entry => entry.tags))];
  
  // Filter entries based on search term and selected tags
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => entry.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  const handleExportEntries = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `journal-entries-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Journal History</h3>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search entries..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 w-full"
            />
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} className="mr-1" />
            Filter
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleExportEntries}
          >
            Export
          </Button>
        </div>
        
        {showFilters && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Filter by tags:</span>
              {(selectedTags.length > 0 || searchTerm) && (
                <button 
                  onClick={handleClearFilters}
                  className="text-sm text-blue-500 hover:text-blue-700 flex items-center"
                >
                  <X size={14} className="mr-1" />
                  Clear filters
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`rounded-full px-3 py-1 text-sm flex items-center transition-colors ${
                    selectedTags.includes(tag) 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Tag size={14} className="mr-1" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {filteredEntries.length > 0 ? (
          filteredEntries.map(entry => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onClick={() => handleEntryClick(entry)}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar size={40} className="mx-auto mb-2 opacity-30" />
            <p>No journal entries found</p>
            <p className="text-sm">
              {entries.length > 0 
                ? 'Try adjusting your search or filters'
                : 'Start journaling to see your entries here'}
            </p>
          </div>
        )}
      </div>

      {selectedEntry && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal}
          title={`Journal Entry - ${new Date(selectedEntry.timestamp).toLocaleDateString()}`}
        >
          <div className="p-4">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{selectedEntry.mood}</span>
              <div>
                <div className="text-gray-500 text-sm">
                  {new Date(selectedEntry.timestamp).toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
            
            <div className="prose max-w-none mb-4">
              <p className="whitespace-pre-wrap">{selectedEntry.text}</p>
            </div>
            
            {selectedEntry.tags.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.tags.map(tag => (
                    <div 
                      key={tag} 
                      className="bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-sm flex items-center"
                    >
                      <Tag size={14} className="mr-1" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default JournalHistory;