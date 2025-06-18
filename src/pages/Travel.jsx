import { useState, useEffect, useRef, useCallback } from 'react';
import { FiSave, FiActivity, FiMessageSquare, FiCalendar, FiChevronRight, FiStar, FiSun, FiMoon, FiCloud } from 'react-icons/fi';
import Navbar from '../components/Navbar'; // Fixed import path
import Footer from '../components/Footer';

const AIJournal = () => {
  // State management
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sentiment, setSentiment] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [activeTab, setActiveTab] = useState('write');
  const textareaRef = useRef(null);

  // Load saved entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries));
      } catch (error) {
        console.error('Error parsing saved entries:', error);
      }
    }
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  // Handlers
  const handleEntryChange = (e) => {
    setCurrentEntry(e.target.value);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const saveEntry = useCallback(() => {
    if (!currentEntry.trim()) return;
    
    const newEntry = {
      id: Date.now(),
      content: currentEntry,
      date: new Date().toISOString(),
      sentiment,
      suggestions
    };
    
    setEntries(prev => [newEntry, ...prev]);
    setCurrentEntry('');
    setSentiment(null);
    setSuggestions([]);
    
    // Auto-focus on textarea after save
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [currentEntry, sentiment, suggestions]);

  const analyzeSentiment = useCallback(async () => {
    if (!currentEntry.trim()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Enhanced sentiment analysis
      const positiveWords = ['happy', 'joy', 'excited', 'great', 'wonderful', 'love', 'amazing', 'grateful'];
      const negativeWords = ['sad', 'angry', 'frustrated', 'bad', 'hate', 'worried', 'anxious', 'stress'];
      const neutralWords = ['think', 'consider', 'reflect', 'maybe', 'perhaps'];
      
      const words = currentEntry.toLowerCase().match(/\b\w+\b/g) || [];
      let positiveCount = 0;
      let negativeCount = 0;
      let neutralCount = 0;
      
      words.forEach(word => {
        if (positiveWords.includes(word)) positiveCount++;
        else if (negativeWords.includes(word)) negativeCount++;
        else if (neutralWords.includes(word)) neutralCount++;
      });
      
      // More nuanced sentiment detection
      let result = 'neutral';
      if (positiveCount > negativeCount && positiveCount > neutralCount) result = 'positive';
      else if (negativeCount > positiveCount && negativeCount > neutralCount) result = 'negative';
      
      setSentiment(result);
      
      // Generate context-aware suggestions
      const mockSuggestions = [];
      const entryLength = currentEntry.length;
      
      if (result === 'negative') {
        mockSuggestions.push('What might help improve your mood today?');
        if (entryLength > 200) {
          mockSuggestions.push('This seems detailed. What specific aspect is most troubling?');
        }
        mockSuggestions.push('Can you recall a similar situation that you handled well?');
      } else if (result === 'positive') {
        mockSuggestions.push('What specifically contributed to these positive feelings?');
        if (entryLength > 150) {
          mockSuggestions.push('You wrote quite a bit about this - what stands out as most meaningful?');
        }
        mockSuggestions.push('How can you create more moments like this?');
      } else {
        mockSuggestions.push('What deeper thoughts or feelings underlie this reflection?');
        if (entryLength > 100) {
          mockSuggestions.push('What patterns do you notice in what you wrote?');
        }
      }
      
      setSuggestions(mockSuggestions);
      
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentEntry]);

  const getAIResponse = useCallback(async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Enhanced mock responses based on prompt content
      let response;
      const promptLower = prompt.toLowerCase();
      
      if (promptLower.includes('help') || promptLower.includes('guidance')) {
        response = "When facing challenges, consider breaking them into smaller steps. What's one small action you could take right now?";
      } 
      else if (promptLower.includes('feel') || promptLower.includes('emotion')) {
        response = "Emotions are valuable signals. Can you identify where in your body you feel this emotion most strongly?";
      }
      else if (promptLower.includes('goal') || promptLower.includes('achieve')) {
        response = "Progress happens in small steps. What's one thing you could do today to move closer to this goal?";
      }
      else {
        const genericResponses = [
          "That's an interesting reflection. What might be the next step in exploring this?",
          "I notice you're focusing on this aspect. How does this connect to your broader life perspective?",
          "Your thoughts show deep introspection. What emotions come up as you reflect on this?",
          "This seems important to you. What would your future self say about this situation?",
          "Regular journaling about this might provide more clarity. Would you like me to suggest a follow-up question?"
        ];
        response = genericResponses[Math.floor(Math.random() * genericResponses.length)];
      }
      //for koko
      setAiResponse(response);
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      setAiResponse("Sorry, I couldn't process your request. Please try again with a different prompt.");
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  // Helper functions
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      saveEntry();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSentimentIcon = (sentiment) => {
    switch(sentiment) {
      case 'positive': return <FiSun className="text-yellow-500" />;
      case 'negative': return <FiMoon className="text-indigo-500" />;
      default: return <FiCloud className="text-gray-400" />;
    }
  };

  // Quick prompts for the Reflect tab
  const quickPrompts = [
    "What am I grateful for today?",
    "What challenged me recently?",
    "What lesson did I learn this week?",
    "How have I grown recently?",
    "What do I need to let go of?",
    "What brings me joy right now?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Mindful Journal
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Your personal space for reflection, growth, and AI-powered insights
          </p>
        </div>
        
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {['write', 'reflect', 'entries'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 text-center font-medium transition-all ${
                  activeTab === tab 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {tab === 'write' && <FiMessageSquare />}
                  {tab === 'reflect' && <FiActivity />}
                  {tab === 'entries' && <FiCalendar />}
                  <span>
                    {tab === 'write' ? 'Write' : 
                     tab === 'reflect' ? 'Reflect' : 'Entries'}
                  </span>
                </div>
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'write' && (
              <WriteTab
                currentEntry={currentEntry}
                handleEntryChange={handleEntryChange}
                handleKeyDown={handleKeyDown}
                saveEntry={saveEntry}
                analyzeSentiment={analyzeSentiment}
                isLoading={isLoading}
                sentiment={sentiment}
                suggestions={suggestions}
                getSentimentIcon={getSentimentIcon}
                textareaRef={textareaRef}
              />
            )}
            
            {activeTab === 'reflect' && (
              <ReflectTab
                prompt={prompt}
                handlePromptChange={handlePromptChange}
                getAIResponse={getAIResponse}
                isLoading={isLoading}
                aiResponse={aiResponse}
                quickPrompts={quickPrompts}
                setPrompt={setPrompt}
              />
            )}
            
            {activeTab === 'entries' && (
              <EntriesTab 
                entries={entries} 
                formatDate={formatDate} 
                getSentimentIcon={getSentimentIcon} 
              />
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Your private thoughts are securely stored in your browser</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Sub-components for better organization
const WriteTab = ({
  currentEntry,
  handleEntryChange,
  handleKeyDown,
  saveEntry,
  analyzeSentiment,
  isLoading,
  sentiment,
  suggestions,
  getSentimentIcon,
  textareaRef
}) => (
  <div>
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <label htmlFor="journal-entry" className="block text-sm font-medium text-gray-700">
          Today's Reflection
        </label>
        <span className="text-xs text-gray-500">
          {currentEntry.length} characters
        </span>
      </div>
      <textarea
        ref={textareaRef}
        id="journal-entry"
        rows={8}
        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700 placeholder-gray-400 resize-none"
        placeholder="How are you feeling today? What's on your mind?..."
        value={currentEntry}
        onChange={handleEntryChange}
        onKeyDown={handleKeyDown}
      />
    </div>
    
    <div className="flex flex-wrap gap-3 mb-6">
      <button
        onClick={saveEntry}
        disabled={!currentEntry.trim()}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
          currentEntry.trim() 
            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        <FiSave size={18} />
        <span>Save Entry</span>
      </button>
      
      <button
        onClick={analyzeSentiment}
        disabled={!currentEntry.trim() || isLoading}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
          !currentEntry.trim() || isLoading 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md hover:shadow-lg hover:from-purple-600 hover:to-indigo-700'
        }`}
      >
        <FiActivity size={18} />
        <span>{isLoading ? 'Analyzing...' : 'Analyze'}</span>
      </button>
    </div>
    
    {(sentiment || suggestions.length > 0) && (
      <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        {sentiment && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <span>Mood Analysis</span>
              {getSentimentIcon(sentiment)}
            </h3>
            <div className="flex items-center">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                sentiment === 'positive' ? 'bg-green-100 text-green-800' : 
                sentiment === 'negative' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
              </span>
            </div>
          </div>
        )}
        
        {suggestions.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Reflection Prompts</h3>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <FiChevronRight className="flex-shrink-0 mt-1 mr-2 text-blue-500" />
                  <span className="text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )}
  </div>
);

const ReflectTab = ({
  prompt,
  handlePromptChange,
  getAIResponse,
  isLoading,
  aiResponse,
  quickPrompts,
  setPrompt
}) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-800 mb-5">AI Journal Guide</h2>
    
    <div className="mb-6">
      <label htmlFor="ai-prompt" className="block text-sm font-medium text-gray-700 mb-3">
        Ask for guidance or reflection
      </label>
      <div className="flex gap-3">
        <input
          type="text"
          id="ai-prompt"
          className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700 placeholder-gray-400"
          placeholder="e.g., 'Help me process this situation...', 'Suggest questions about...'"
          value={prompt}
          onChange={handlePromptChange}
          onKeyDown={(e) => e.key === 'Enter' && getAIResponse()}
        />
        <button
          onClick={getAIResponse}
          disabled={!prompt.trim() || isLoading}
          className={`px-5 py-3 rounded-lg font-medium transition-all ${
            !prompt.trim() || isLoading 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-700'
          }`}
        >
          {isLoading ? 'Thinking...' : 'Ask'}
        </button>
      </div>
    </div>
    
    {aiResponse && (
      <div className="mt-6 p-5 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
        <h3 className="text-sm font-medium text-indigo-700 mb-2 flex items-center gap-2">
          <FiStar className="text-indigo-500" />
          <span>Journal Guide Response</span>
        </h3>
        <p className="text-gray-800 leading-relaxed">{aiResponse}</p>
      </div>
    )}
    
    <div className="mt-8">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Prompts</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickPrompts.map((quickPrompt, i) => (
          <button
            key={i}
            onClick={() => setPrompt(quickPrompt)}
            className="px-4 py-2.5 text-left text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            {quickPrompt}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const EntriesTab = ({ entries, formatDate, getSentimentIcon }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-800">Your Journal Entries</h2>
      <span className="text-sm text-gray-500">
        {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
      </span>
    </div>
    
    {entries.length > 0 ? (
      <div className="space-y-5">
        {entries.map((entry) => (
          <div key={entry.id} className="group relative p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-200 transition hover:shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <FiCalendar className="text-gray-400" />
                {formatDate(entry.date)}
              </span>
              {entry.sentiment && (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  entry.sentiment === 'positive' ? 'bg-green-50 text-green-700' : 
                  entry.sentiment === 'negative' ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-50 text-gray-700'
                }`}>
                  {entry.sentiment.charAt(0).toUpperCase() + entry.sentiment.slice(1)}
                </span>
              )}
            </div>
            <p className="text-gray-700 whitespace-pre-line mb-3">{entry.content}</p>
            
            {entry.suggestions && entry.suggestions.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Reflection Prompts</h4>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  {entry.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex items-start">
                      <FiChevronRight className="flex-shrink-0 mt-1 mr-1.5 text-blue-400" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-10">
        <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <FiMessageSquare className="text-blue-400 text-2xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No entries yet</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Your journal entries will appear here. Start writing to begin your reflection journey.
        </p>
      </div>
    )}
  </div>
);

export default AIJournal;
