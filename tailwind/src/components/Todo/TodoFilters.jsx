import { useTodoFilters } from '../../hooks/useTodoFilters';

export default function TodoFilters() {
    const {
        filter,
        searchTerm,
        selectedCategory,
        categories,
        setFilter,
        setSearchTerm,
        setSelectedCategory,
    } = useTodoFilters();

    const filterButtons = [
        { key: 'all', label: 'All', count: null },
        { key: 'active', label: 'Active', count: null },
        { key: 'completed', label: 'Completed', count: null },
    ];

    return (
        <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                {/* Search Input */}
                <div className="flex-1 lg:max-w-xs">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search todos..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
                    {filterButtons.map((btn) => (
                        <button
                            key={btn.key}
                            onClick={() => setFilter(btn.key)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === btn.key
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                                }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                {/* Category Filter */}
                <div className="lg:flex-shrink-0">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full lg:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                    >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || selectedCategory !== 'all' || filter !== 'all') && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {searchTerm && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Search: "{searchTerm}"
                            <button
                                onClick={() => setSearchTerm('')}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {selectedCategory !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Category: {selectedCategory}
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className="ml-2 text-green-600 hover:text-green-800"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {filter !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Status: {filter}
                            <button
                                onClick={() => setFilter('all')}
                                className="ml-2 text-purple-600 hover:text-purple-800"
                            >
                                ×
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
