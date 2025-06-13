export default function JournalEntry({ title, date, category }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <span className="text-sm text-indigo-600 font-semibold">{category}</span>
        <h3 className="text-xl font-bold mt-2 mb-1">{title}</h3>
        <p className="text-gray-500">{date}</p>
        <button className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200">
          Read More
        </button>
      </div>
    );
  }