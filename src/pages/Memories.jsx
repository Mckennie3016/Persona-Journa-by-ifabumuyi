// src/components/TravelJournal.jsx
import React, { useState, useEffect } from 'react';
import { Heart, Star, Camera, MapPin, Calendar, Smile, Sun, Moon, Cloud, Sparkles, Save, List, Search, Trash2, ChevronLeft, Image as ImageIcon } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function TravelJournal() {
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    weather: 'sunny',
    mood: 'happy',
    content: '',
    tags: [],
    photos: []
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [entries, setEntries] = useState([]);
  const [viewMode, setViewMode] = useState('create'); // 'create' or 'view'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [photoPreview, setPhotoPreview] = useState([]);

  // Load saved entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('travelJournal');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage when they change
  useEffect(() => {
    localStorage.setItem('travelJournal', JSON.stringify(entries));
  }, [entries]);

  const weatherIcons = {
    sunny: Sun,
    cloudy: Cloud,
    rainy: Cloud,
    night: Moon
  };

  const moodEmojis = {
    happy: '😊',
    excited: '🤩',
    peaceful: '😌',
    grateful: '🥰',
    adventurous: '🌟',
    contemplative: '🤔'
  };

  const availableTags = [
    'Beach', 'Mountain', 'City', 'Countryside', 'Adventure', 
    'Relaxation', 'Food', 'Culture', 'Family', 'Solo'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSaveEntry = () => {
    if (!formData.content.trim()) return;
    
    const newEntry = {
      id: Date.now(),
      ...formData,
      tags: selectedTags,
      createdAt: new Date().toISOString()
    };
    
    setEntries([newEntry, ...entries]);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      weather: 'sunny',
      mood: 'happy',
      content: '',
      tags: [],
      photos: []
    });
    setSelectedTags([]);
    setPhotoPreview([]);
  };

  const handleViewEntry = (entry) => {
    setSelectedEntry(entry);
    setViewMode('view');
  };

  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter(entry => entry.id !== id));
      if (selectedEntry && selectedEntry.id === id) {
        setViewMode('create');
        setSelectedEntry(null);
      }
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const previews = files.map(file => URL.createObjectURL(file));
      setPhotoPreview([...photoPreview, ...previews]);
      // In a real app, you would upload to a server here
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...files.map(file => ({ name: file.name, url: URL.createObjectURL(file) }))]
      }));
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => entry.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const WeatherIcon = weatherIcons[formData.weather];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <NavBar/>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 relative pt-6">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
            <Sparkles className="text-blue-400 w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-blue-900 mb-2 font-serif">
            Travel Journal
          </h1>
          <p className="text-blue-700 text-lg italic">
            Capture your travel adventures
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setViewMode('create')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                viewMode === 'create' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-blue-700 hover:bg-blue-50'
              }`}
            >
              Create New Entry
            </button>
            <button
              onClick={() => setViewMode('view')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                viewMode === 'view' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-blue-700 hover:bg-blue-50'
              }`}
            >
              View Entries
            </button>
          </div>
        </div>

        {viewMode === 'create' ? (
          /* CREATE MODE */
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-200 overflow-hidden">
            {/* Decorative Header */}
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 border-b border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Give this entry a title..."
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="text-2xl font-bold text-blue-900 bg-transparent placeholder-blue-600 border-none outline-none font-serif"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-blue-700">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="bg-transparent border-none outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* Context Row */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Location */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">Location</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Where did you travel?"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full bg-transparent placeholder-blue-500 text-blue-900 border-none outline-none text-lg"
                  />
                </div>

                {/* Weather */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <WeatherIcon className="w-5 h-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">Weather</span>
                  </div>
                  <select
                    value={formData.weather}
                    onChange={(e) => handleInputChange('weather', e.target.value)}
                    className="w-full bg-transparent text-yellow-900 border-none outline-none text-lg cursor-pointer"
                  >
                    <option value="sunny">Sunny ☀️</option>
                    <option value="cloudy">Cloudy ☁️</option>
                    <option value="rainy">Rainy 🌧️</option>
                    <option value="night">Night 🌙</option>
                  </select>
                </div>

                {/* Mood */}
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-4 border border-pink-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Smile className="w-5 h-5 text-pink-600" />
                    <span className="font-semibold text-pink-800">Mood</span>
                  </div>
                  <select
                    value={formData.mood}
                    onChange={(e) => handleInputChange('mood', e.target.value)}
                    className="w-full bg-transparent text-pink-900 border-none outline-none text-lg cursor-pointer"
                  >
                    {Object.entries(moodEmojis).map(([mood, emoji]) => (
                      <option key={mood} value={mood}>
                        {mood.charAt(0).toUpperCase() + mood.slice(1)} {emoji}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Main Content Section */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-purple-800">Your Travel Experience</h3>
                </div>
                <textarea
                  placeholder="Describe your travel experience... What did you see? What did you do? What made this trip special?"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  className="w-full bg-white/50 rounded-xl p-4 text-purple-900 placeholder-purple-500 border border-purple-200 outline-none resize-none min-h-32 text-lg leading-relaxed"
                  rows="6"
                />
              </div>

              {/* Tags Section */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-amber-800">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-400 text-white shadow-md transform scale-105'
                          : 'bg-white text-blue-700 border border-blue-300 hover:bg-blue-100'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Upload - Space for 4 images */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Camera className="w-6 h-6 text-gray-600" />
                  <h3 className="text-xl font-bold text-gray-800">Travel Photos</h3>
                </div>
                
                {photoPreview.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {photoPreview.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={preview} 
                          alt={`Preview ${index}`} 
                          className="w-full h-32 object-cover rounded-lg shadow-sm"
                        />
                        <button
                          onClick={() => {
                            setPhotoPreview(photoPreview.filter((_, i) => i !== index));
                            setFormData(prev => ({
                              ...prev,
                              photos: prev.photos.filter((_, i) => i !== index)
                            }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {/* Empty slots for remaining photos */}
                    {Array.from({ length: 4 - photoPreview.length }).map((_, index) => (
                      <div key={`empty-${index}`} className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center text-gray-400">
                        <Camera className="w-8 h-8" />
                      </div>
                    ))}
                  </div>
                )}
                
                {photoPreview.length < 4 && (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-400 transition-colors">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <Camera className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="text-gray-600 text-center">
                      {photoPreview.length > 0 
                        ? 'Add more photos' 
                        : 'Click to upload photos (max 4)'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                  </label>
                )}
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSaveEntry}
                  disabled={!formData.content.trim()}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    formData.content.trim()
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Save className="w-5 h-5" />
                  <span>Save Entry</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* VIEW MODE */
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-200 p-6">
            {selectedEntry ? (
              /* SINGLE ENTRY VIEW */
              <div>
                <button 
                  onClick={() => setSelectedEntry(null)}
                  className="flex items-center text-blue-600 mb-6 hover:text-blue-800"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Back to all entries
                </button>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold text-blue-900 font-serif mb-2">{selectedEntry.title}</h2>
                      <div className="flex items-center space-x-4 text-blue-700">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-5 h-5" />
                          <span>{selectedEntry.date}</span>
                        </div>
                        {selectedEntry.location && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-5 h-5" />
                            <span>{selectedEntry.location}</span>
                          </div>
                        )}
                      </div>
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
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                      {weatherIcons[selectedEntry.weather] ? 
                        React.createElement(weatherIcons[selectedEntry.weather], { className: "w-4 h-4 mr-1" }) : 
                        null}
                      {selectedEntry.weather.charAt(0).toUpperCase() + selectedEntry.weather.slice(1)}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-700">
                      {moodEmojis[selectedEntry.mood] || '😊'} {selectedEntry.mood.charAt(0).toUpperCase() + selectedEntry.mood.slice(1)}
                    </span>
                    {selectedEntry.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Entry Content */}
                <div className="prose max-w-none text-gray-700 mb-8">
                  <h3 className="text-xl font-semibold text-purple-800 mb-4">Travel Experience</h3>
                  {selectedEntry.content.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>
                
                {/* Photos - Grid of 4 images */}
                {selectedEntry.photos.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <ImageIcon className="w-6 h-6 mr-2 text-gray-600" />
                      Travel Photos
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedEntry.photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={photo.url} 
                            alt={photo.name} 
                            className="w-full h-48 object-cover rounded-lg shadow-md"
                          />
                        </div>
                      ))}
                      {/* Fill remaining slots if less than 4 photos */}
                      {Array.from({ length: 4 - selectedEntry.photos.length }).map((_, index) => (
                        <div key={`empty-${index}`} className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center text-gray-400">
                          <Camera className="w-8 h-8" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ALL ENTRIES VIEW */
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h2 className="text-2xl font-bold text-blue-900 font-serif">Your Travel Entries</h2>
                  
                  <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
                    <div className="relative w-full md:w-64">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search entries..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <select
                      value={selectedTags}
                      onChange={(e) => setSelectedTags(e.target.value ? [e.target.value] : [])}
                      className="block w-full md:w-48 pl-3 pr-10 py-2 border border-gray-300 rounded-xl leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">All Tags</option>
                      {availableTags.map(tag => (
                        <option key={tag} value={tag}>#{tag}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {filteredEntries.length === 0 ? (
                  <div className="text-center py-12">
                    <MapPin className="mx-auto h-12 w-12 text-blue-400" />
                    <h3 className="mt-2 text-lg font-medium text-blue-900">
                      {entries.length === 0 ? 'No entries yet' : 'No matching entries found'}
                    </h3>
                    <p className="mt-1 text-sm text-blue-700">
                      {entries.length === 0 
                        ? 'Start by creating your first travel entry!' 
                        : 'Try a different search or filter'}
                    </p>
                    {entries.length === 0 && (
                      <button
                        onClick={() => setViewMode('create')}
                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Create First Entry
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredEntries.map(entry => (
                      <div 
                        key={entry.id} 
                        className="border border-blue-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => handleViewEntry(entry)}
                      >
                        {entry.photos.length > 0 && (
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={entry.photos[0].url} 
                              alt={entry.photos[0].name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold text-blue-900 font-serif mb-2">{entry.title}</h3>
                            <span className="text-sm text-blue-600 whitespace-nowrap ml-2">
                              {entry.date}
                            </span>
                          </div>
                          {entry.location && (
                            <p className="flex items-center text-blue-700 mb-3">
                              <MapPin className="w-4 h-4 mr-1" />
                              {entry.location}
                            </p>
                          )}
                          <p className="text-gray-600 line-clamp-2 mb-4">
                            {entry.content.substring(0, 150)}{entry.content.length > 150 ? '...' : ''}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                              {moodEmojis[entry.mood] || '😊'} {entry.mood}
                            </span>
                            {entry.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                                #{tag}
                              </span>
                            ))}
                            {entry.tags.length > 2 && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                                +{entry.tags.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer Quote */}
        <div className="text-center mt-8 text-blue-700">
          <p className="italic text-lg">
            "The world is a book, and those who do not travel read only one page."
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}