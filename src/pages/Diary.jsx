import React, { useState, useEffect } from 'react';
import { 
  Calendar, Heart, Star, Cloud, Sun, Moon, Smile, Frown, Meh, 
  Save, List, Search, Bold, Italic, Underline, Link, Image, 
  Bookmark, Tag, Trash2, ChevronLeft, ChevronRight
} from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function DiaryPage() {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('');
  const [weather, setWeather] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [entries, setEntries] = useState([]);
  const [viewMode, setViewMode] = useState('write'); // 'write' or 'view'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [title, setTitle] = useState('');

  // Load saved entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
    
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
    setCurrentTime(now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }));
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    setWordCount(entry.trim().split(/\s+/).filter(word => word.length > 0).length);
  }, [entry]);

  const moods = [
    { icon: Smile, label: 'Happy', color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { icon: Heart, label: 'Loved', color: 'text-pink-500', bg: 'bg-pink-100' },
    { icon: Meh, label: 'Okay', color: 'text-blue-500', bg: 'bg-blue-100' },
    { icon: Frown, label: 'Sad', color: 'text-gray-500', bg: 'bg-gray-100' },
    { icon: Star, label: 'Amazing', color: 'text-purple-500', bg: 'bg-purple-100' }
  ];

  const weathers = [
    { icon: Sun, label: 'Sunny', color: 'text-orange-500' },
    { icon: Cloud, label: 'Cloudy', color: 'text-gray-500' },
    { icon: Moon, label: 'Night', color: 'text-indigo-500' },
    { icon: Cloud, label: 'Rainy', color: 'text-blue-500' },
    { icon: Sun, label: 'Windy', color: 'text-green-500' }
  ];

  const handleSaveEntry = () => {
    if (!entry.trim()) return;
    
    const newEntry = {
      id: Date.now(),
      title: title || `Entry from ${currentDate}`,
      content: entry,
      mood,
      weather,
      tags,
      date: currentDate,
      time: currentTime,
      wordCount,
      createdAt: new Date().toISOString()
    };
    
    setEntries([newEntry, ...entries]);
    resetForm();
  };

  const resetForm = () => {
    setEntry('');
    setTitle('');
    setMood('');
    setWeather('');
    setTags([]);
    setCurrentTag('');
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleViewEntry = (entry) => {
    setSelectedEntry(entry);
    setViewMode('view');
  };

  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter(entry => entry.id !== id));
      if (selectedEntry && selectedEntry.id === id) {
        setViewMode('write');
        setSelectedEntry(null);
      }
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         entry.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const formatText = (command) => {
    const textarea = document.getElementById('diary-textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = entry.substring(start, end);
    let newText = entry;
    
    switch(command) {
      case 'bold':
        newText = entry.substring(0, start) + `**${selectedText}**` + entry.substring(end);
        break;
      case 'italic':
        newText = entry.substring(0, start) + `*${selectedText}*` + entry.substring(end);
        break;
      case 'underline':
        newText = entry.substring(0, start) + `_${selectedText}_` + entry.substring(end);
        break;
      default:
        break;
    }
    
    setEntry(newText);
    // Return focus to textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 2, end + 2);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <NavBar/>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            My Digital Diary
          </h1>
          
          <p className="text-gray-600 text-lg">Capture your thoughts, memories, and moments</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setViewMode('write')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                viewMode === 'write' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Write New Entry
            </button>
            <button
              onClick={() => setViewMode('view')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                viewMode === 'view' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              View Past Entries
            </button>
          </div>
        </div>

        {viewMode === 'write' ? (
          /* WRITE MODE */
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 mb-6">
            {/* Date and Time Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Calendar className="text-purple-600 w-6 h-6" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{currentDate}</h2>
                  <p className="text-gray-500">{currentTime}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Words: {wordCount}</p>
              </div>
            </div>

            {/* Title Input */}
            <div className="mb-6">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Entry title (optional)"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-gray-700 text-xl font-medium bg-gradient-to-br from-white to-gray-50 placeholder-gray-400"
              />
            </div>

            {/* Mood and Weather Selection */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Mood Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">How are you feeling?</h3>
                <div className="flex flex-wrap gap-2">
                  {moods.map((moodOption) => {
                    const Icon = moodOption.icon;
                    return (
                      <button
                        key={moodOption.label}
                        onClick={() => setMood(moodOption.label)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all duration-200 hover:scale-105 ${
                          mood === moodOption.label
                            ? `${moodOption.bg} border-current ${moodOption.color}`
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{moodOption.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Weather Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">What's the weather like?</h3>
                <div className="flex flex-wrap gap-2">
                  {weathers.map((weatherOption) => {
                    const Icon = weatherOption.icon;
                    return (
                      <button
                        key={weatherOption.label}
                        onClick={() => setWeather(weatherOption.label)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all duration-200 hover:scale-105 ${
                          weather === weatherOption.label
                            ? `bg-blue-50 border-current ${weatherOption.color}`
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{weatherOption.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
              <div className="flex flex-wrap items-center gap-2">
                {tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
                    #{tag}
                    <button 
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-purple-500 hover:text-purple-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  placeholder="Add tag (press Enter)"
                  className="px-3 py-1 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            {/* Writing Area */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Dear Diary...</h3>
              
              {/* Text Formatting Toolbar */}
              <div className="flex gap-2 mb-2 p-2 bg-gray-100 rounded-lg">
                <button 
                  onClick={() => formatText('bold')}
                  className="p-2 hover:bg-gray-200 rounded"
                  title="Bold"
                >
                  <Bold className="w-4 h-4 text-gray-700" />
                </button>
                <button 
                  onClick={() => formatText('italic')}
                  className="p-2 hover:bg-gray-200 rounded"
                  title="Italic"
                >
                  <Italic className="w-4 h-4 text-gray-700" />
                </button>
                <button 
                  onClick={() => formatText('underline')}
                  className="p-2 hover:bg-gray-200 rounded"
                  title="Underline"
                >
                  <Underline className="w-4 h-4 text-gray-700" />
                </button>
                <div className="border-l border-gray-300 mx-1"></div>
                <button className="p-2 hover:bg-gray-200 rounded" title="Add link">
                  <Link className="w-4 h-4 text-gray-700" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded" title="Add image">
                  <Image className="w-4 h-4 text-gray-700" />
                </button>
              </div>
              
              <textarea
                id="diary-textarea"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="What's on your mind today? Share your thoughts, experiences, dreams, or anything that matters to you..."
                className="w-full h-80 p-6 border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:outline-none resize-none text-gray-700 leading-relaxed text-lg bg-gradient-to-br from-white to-gray-50 placeholder-gray-400"
                style={{ fontFamily: 'Georgia, serif' }}
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveEntry}
                disabled={!entry.trim()}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  entry.trim()
                    ? 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Save className="w-5 h-5" />
                <span>Save Entry</span>
              </button>
            </div>

            {/* Footer with decorative elements */}
            <div className="flex justify-between items-center pt-4 mt-6 border-t border-gray-200">
              <div className="flex space-x-2">
                {mood && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
                    Feeling {mood.toLowerCase()}
                  </span>
                )}
                {weather && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                    {weather} day
                  </span>
                )}
                {tags.length > 0 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                    {tags.length} tag{tags.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500 italic">
                "Every day is a new page in your story"
              </div>
            </div>
          </div>
        ) : (
          /* VIEW MODE */
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 mb-6">
            {selectedEntry ? (
              /* SINGLE ENTRY VIEW */
              <div>
                <button 
                  onClick={() => setSelectedEntry(null)}
                  className="flex items-center text-purple-600 mb-4 hover:text-purple-800"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Back to all entries
                </button>
                
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedEntry.title}</h2>
                      <p className="text-gray-500">{selectedEntry.date} • {selectedEntry.time}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteEntry(selectedEntry.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                      title="Delete entry"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedEntry.mood && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
                        <Smile className="w-4 h-4 mr-1" />
                        {selectedEntry.mood}
                      </span>
                    )}
                    {selectedEntry.weather && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                        <Sun className="w-4 h-4 mr-1" />
                        {selectedEntry.weather}
                      </span>
                    )}
                    {selectedEntry.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                        <Tag className="w-3 h-3 mr-1" />
                        #{tag}
                      </span>
                    ))}
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                      {selectedEntry.wordCount} words
                    </span>
                  </div>
                </div>
                
                <div className="prose max-w-none text-gray-700">
                  {selectedEntry.content.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            ) : (
              /* ALL ENTRIES VIEW */
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Your Journal Entries</h2>
                  <div className="relative w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search entries..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                {filteredEntries.length === 0 ? (
                  <div className="text-center py-12">
                    <Bookmark className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                      {entries.length === 0 ? 'No entries yet' : 'No matching entries found'}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {entries.length === 0 
                        ? 'Start by writing your first diary entry!' 
                        : 'Try a different search term'}
                    </p>
                    {entries.length === 0 && (
                      <button
                        onClick={() => setViewMode('write')}
                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Write First Entry
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredEntries.map(entry => (
                      <div 
                        key={entry.id} 
                        className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleViewEntry(entry)}
                      >
                        <div className="flex justify-between">
                          <h3 className="text-lg font-semibold text-gray-800">{entry.title}</h3>
                          <span className="text-sm text-gray-500">{entry.date}</span>
                        </div>
                        <p className="mt-2 text-gray-600 line-clamp-2">
                          {entry.content.substring(0, 200)}{entry.content.length > 200 ? '...' : ''}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {entry.mood && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
                              {entry.mood}
                            </span>
                          )}
                          {entry.weather && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                              {entry.weather}
                            </span>
                          )}
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                            {entry.wordCount} words
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Decorative Quote */}
        <div className="text-center py-8">
          <p className="text-gray-600 italic text-lg">
            "Journal writing is a voyage to the interior."
          </p>
          <p className="text-gray-500 text-sm mt-2">— Christina Baldwin</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}