import React, { useState, useEffect } from 'react';
import { Calendar, Tag, Save, Clock } from 'lucide-react';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Select from '../../UI/Select';
import MoodSelector from '../MoodLog/MoodSelector';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

const JournalEntry = ({ onSave }) => {
  const [entry, setEntry] = useState({
    id: uuidv4(),
    text: '',
    mood: '😊',
    tags: [],
    timestamp: new Date().toISOString()
  });
  
  const [wordCount, setWordCount] = useState(0);
  const [customTag, setCustomTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveTimeout, setSaveTimeout] = useState(null);

  const commonTags = ['work', 'family', 'health', 'stress', 'joy', 'sleep', 'anxiety', 'gratitude'];

  // Calculate word count
  useEffect(() => {
    const words = entry.text.trim().split(/\s+/);
    setWordCount(entry.text ? words.length : 0);
  }, [entry.text]);

  // Auto-save feature (debounced)
  useEffect(() => {
    if (entry.text.length > 10) {
      if (saveTimeout) clearTimeout(saveTimeout);
      
      const timeout = setTimeout(() => {
        handleAutoSave();
      }, 3000); // Save after 3 seconds of inactivity
      
      setSaveTimeout(timeout);
    }
    
    return () => {
      if (saveTimeout) clearTimeout(saveTimeout);
    };
  }, [entry.text]);

  const handleAutoSave = () => {
    setIsSaving(true);
    
    // Simulate saving to give user feedback
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handleTextChange = (e) => {
    setEntry({ ...entry, text: e.target.value });
  };

  const handleMoodChange = (mood) => {
    setEntry({ ...entry, mood });
  };

  const handleAddTag = () => {
    if (customTag && !entry.tags.includes(customTag)) {
      setEntry({ ...entry, tags: [...entry.tags, customTag] });
      setCustomTag('');
    }
  };

  const handleSelectTag = (tag) => {
    if (!entry.tags.includes(tag)) {
      setEntry({ ...entry, tags: [...entry.tags, tag] });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setEntry({ 
      ...entry, 
      tags: entry.tags.filter(tag => tag !== tagToRemove) 
    });
  };

  const handleSave = () => {
    if (!entry.text.trim()) return;
    
    // Update timestamp to now
    const entryToSave = {
      ...entry,
      timestamp: new Date().toISOString()
    };
    
    onSave(entryToSave);
    
    // Reset form
    setEntry({
      id: uuidv4(),
      text: '',
      mood: '😊',
      tags: [],
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-500" />
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-400" />
          <span className="text-xs text-gray-400">
            {isSaving ? 'Autosaving...' : 'Last saved: just now'}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <MoodSelector selected={entry.mood} onSelect={handleMoodChange} />
      </div>

      <div className="mb-6">
        <textarea
          className="w-full h-40 p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
          placeholder="How are you feeling today? Write your thoughts here..."
          value={entry.text}
          onChange={handleTextChange}
        />
        <div className="flex justify-end mt-2">
          <span className="text-xs text-gray-500">{wordCount} words</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {entry.tags.map(tag => (
            <div 
              key={tag} 
              className="bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-sm flex items-center gap-1"
            >
              <Tag size={14} />
              {tag}
              <button 
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 text-blue-400 hover:text-blue-600"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Add a custom tag..."
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              className="w-full"
            />
          </div>
          <Button onClick={handleAddTag} size="sm" variant="outline">Add</Button>
        </div>
        
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-2">Common tags:</p>
          <div className="flex flex-wrap gap-2">
            {commonTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleSelectTag(tag)}
                className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs hover:bg-gray-200 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} variant="primary" size="md" disabled={!entry.text.trim()}>
          <Save size={16} className="mr-2" />
          Save Entry
        </Button>
      </div>
    </div>
  );
};

export default JournalEntry;