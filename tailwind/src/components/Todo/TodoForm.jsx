import { useState } from 'react';
import { useTodoActions } from '../../hooks/useTodoActions';
import { useTodoFilters } from '../../hooks/useTodoFilters';

export default function TodoForm() {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('Personal');
    const [priority, setPriority] = useState('medium');
    const [showAdvanced, setShowAdvanced] = useState(false);

    const { addTodo } = useTodoActions();
    const { categories } = useTodoFilters();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        addTodo(text, category, priority);
        setText('');
        setShowAdvanced(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-6">
            <div className="flex flex-col space-y-4">
                {/* Main Input */}
                <div className="flex space-x-3">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="What needs to be done?"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                        aria-label="Add new todo"
                        autoComplete="off"
                    />
                    <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                        title="Advanced options"
                    >
                        ⚙️
                    </button>
                    <button
                        type="submit"
                        disabled={!text.trim()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                        Add Todo
                    </button>
                </div>

                {/* Advanced Options */}
                {showAdvanced && (
                    <div className="flex space-x-4 pt-2 border-t border-gray-200">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Priority
                            </label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
}
