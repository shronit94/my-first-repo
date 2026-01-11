export default function LazyFilters({ filters, onToggleFilter }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">😴 Lazy Filters</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onToggleFilter('quickOnly')}
          className={`
            px-5 py-2 rounded-lg font-medium transition-all transform hover:scale-105
            ${filters.quickOnly
              ? 'bg-purple-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
            }
          `}
        >
          ⚡ 15-Min Active Time
        </button>
        <button
          onClick={() => onToggleFilter('onePotOnly')}
          className={`
            px-5 py-2 rounded-lg font-medium transition-all transform hover:scale-105
            ${filters.onePotOnly
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
            }
          `}
        >
          🍳 One-Pot Only
        </button>
      </div>
    </div>
  );
}
