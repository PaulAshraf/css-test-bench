import { useTodoActions } from '../../hooks/useTodoActions';

export default function TodoActions({ selectedTodos, onClearSelection }) {
    const { bulkDelete, bulkToggle } = useTodoActions();

    const handleBulkDelete = () => {
        if (window.confirm(`Delete ${selectedTodos.size} selected todo(s)?`)) {
            bulkDelete(Array.from(selectedTodos));
            onClearSelection();
        }
    };

    const handleBulkToggle = () => {
        bulkToggle(Array.from(selectedTodos));
        onClearSelection();
    };

    return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-yellow-800">
                        {selectedTodos.size} todo(s) selected
                    </span>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleBulkToggle}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Toggle Status
                    </button>

                    <button
                        onClick={handleBulkDelete}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        Delete Selected
                    </button>

                    <button
                        onClick={onClearSelection}
                        className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                        Clear Selection
                    </button>
                </div>
            </div>
        </div>
    );
}
