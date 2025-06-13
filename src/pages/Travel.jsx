// src/components/TravelJournal.jsx
import { useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const TravelJournal = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: 'June 10, 2023',
      location: 'Bali, Indonesia',
      title: 'Journal Entry 1',
      content: 'Content for the first journal entry goes here.',
      photos: [
        'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      ]
    },
    {
      id: 2,
      date: 'June 12, 2023',
      location: 'Ubud, Bali',
      title: 'Journal Entry 2',
      content: 'Content for the second journal entry goes here.',
      photos: [
        'https://images.unsplash.com/photo-1518544866330-95b331ed9cd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      ]
    }
  ]);

  const [newEntry, setNewEntry] = useState({
    date: '',
    location: '',
    title: '',
    content: '',
    photos: []
  });

  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleAddEntry = (e) => {
    e.preventDefault();
    const entryWithId = { ...newEntry, id: entries.length + 1 };
    setEntries([...entries, entryWithId]);
    setNewEntry({
      date: '',
      location: '',
      title: '',
      content: '',
      photos: []
    });
    setSelectedEntry(entryWithId);
  };

  const handleUpdateEntry = (e) => {
    e.preventDefault();
    setEntries(entries.map(entry => 
      entry.id === selectedEntry.id ? selectedEntry : entry
    ));
    setSelectedEntry(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white-150 to-indigo-100">
      <Navbar/>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Travel Journal</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Journal Entries List - Left Side */}
          <div className="lg:w-1/2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Entries</h2>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              {entries.map((entry) => (
                <div 
                  key={entry.id} 
                  className={`bg-white p-4 rounded-lg shadow cursor-pointer transition-all ${selectedEntry?.id === entry.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'}`}
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-800">{entry.title}</h3>
                    <span className="text-sm text-gray-500">{entry.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{entry.location}</p>
                  <p className="mt-2 text-gray-700 line-clamp-2">{entry.content}</p>
                  {entry.photos.length > 0 && (
                    <img 
                      src={entry.photos[0]} 
                      alt={`Preview for ${entry.title}`}
                      className="mt-2 w-full h-32 object-cover rounded"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Entry Form/View - Right Side */}
          <div className="lg:w-1/2">
            {selectedEntry ? (
              <div className="bg-white p-6 rounded-lg shadow sticky top-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">View/Edit Entry</h2>
                  <button 
                    onClick={() => setSelectedEntry(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handleUpdateEntry}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        value={selectedEntry.date}
                        onChange={(e) => setSelectedEntry({...selectedEntry, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        value={selectedEntry.location}
                        onChange={(e) => setSelectedEntry({...selectedEntry, location: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        value={selectedEntry.title}
                        onChange={(e) => setSelectedEntry({...selectedEntry, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Content</label>
                      <textarea
                        rows={6}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        value={selectedEntry.content}
                        onChange={(e) => setSelectedEntry({...selectedEntry, content: e.target.value})}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
                        onClick={() => setSelectedEntry(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow sticky top-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Entry</h2>
                <form onSubmit={handleAddEntry}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        value={newEntry.date}
                        onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        value={newEntry.location}
                        onChange={(e) => setNewEntry({...newEntry, location: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        value={newEntry.title}
                        onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Content</label>
                      <textarea
                        rows={6}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        value={newEntry.content}
                        onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                    >
                      Add Entry
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default TravelJournal;