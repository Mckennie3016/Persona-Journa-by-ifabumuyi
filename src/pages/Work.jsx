import { useState } from 'react';
import { Calendar, Clock, Target, Lightbulb, Star, Plus, Check, X } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
export default function WorkJournal() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review quarterly reports', completed: false, priority: 'high' },
    { id: 2, text: 'Team standup meeting', completed: true, priority: 'medium' },
    { id: 3, text: 'Update project documentation', completed: false, priority: 'low' }
  ]);
  
  const [newTask, setNewTask] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [goals, setGoals] = useState('');
  const [reflections, setReflections] = useState('');
  const [wins, setWins] = useState(['Completed the client presentation successfully']);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority: 'medium'
      }]);
      setNewTask('');
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-l-red-400 bg-red-50';
      case 'medium': return 'border-l-yellow-400 bg-yellow-50';
      case 'low': return 'border-l-green-400 bg-green-50';
      default: return 'border-l-gray-400 bg-gray-50';
    }
  };

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
    <NavBar/>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Work Journal
              </h1>
              <p className="text-slate-600 mt-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {today}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-slate-700">
                {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
              <div className="text-sm text-slate-500 flex items-center gap-1 justify-end mt-1">
                <Clock className="w-3 h-3" />
                Live time
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200 h-fit">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">Today's Tasks</h2>
              </div>

              {/* Add Task */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <button
                  onClick={addTask}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Task List */}
              <div className="space-y-3">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-lg border-l-4 ${getPriorityColor(task.priority)} transition-all hover:shadow-md`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            task.completed 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : 'border-slate-300 hover:border-green-400'
                          }`}
                        >
                          {task.completed && <Check className="w-3 h-3" />}
                        </button>
                        <span className={`text-sm ${task.completed ? 'line-through text-slate-500' : 'text-slate-700'}`}>
                          {task.text}
                        </span>
                      </div>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Wins */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200 mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">Today's Wins</h2>
              </div>
              <div className="space-y-2">
                {wins.map((win, index) => (
                  <div key={index} className="p-3 bg-yellow-50 rounded-lg border-l-4 border-l-yellow-400">
                    <p className="text-sm text-slate-700">{win}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Journal Entries */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Goals */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">Daily Goals</h2>
              </div>
              <textarea
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="What are your main goals for today?"
                className="w-full h-24 p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-slate-700"
              />
            </div>

            {/* Journal Entry */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">Journal Entry</h2>
              </div>
              <textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="How's your day going? What's on your mind?"
                className="w-full h-40 p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-slate-700"
              />
            </div>

            {/* Reflections */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">End of Day Reflections</h2>
              </div>
              <textarea
                value={reflections}
                onChange={(e) => setReflections(e.target.value)}
                placeholder="What went well today? What could be improved? Key learnings?"
                className="w-full h-32 p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Keep track of your progress, one day at a time 📝
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}