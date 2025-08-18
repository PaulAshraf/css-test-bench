import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoFilters from './TodoFilters';
import TodoList from './TodoList';
import TodoActions from './TodoActions';
import TodoExportImport from './TodoExportImport';

export default function TodoApp() {
    const [selectedTodos, setSelectedTodos] = useState(new Set());

    const handleSelectTodo = (todoId) => {
        const newSelected = new Set(selectedTodos);
        if (newSelected.has(todoId)) {
            newSelected.delete(todoId);
        } else {
            newSelected.add(todoId);
        }
        setSelectedTodos(newSelected);
    };

    const handleSelectAll = (todoIds) => {
        setSelectedTodos(new Set(todoIds));
    };

    const handleClearSelection = () => {
        setSelectedTodos(new Set());
    };

    return (
        <div className="space-y-6">
            {/* Add Todo Form */}
            <TodoForm />

            {/* Filters and Search */}
            <TodoFilters />

            {/* Bulk Actions */}
            {selectedTodos.size > 0 && (
                <TodoActions
                    selectedTodos={selectedTodos}
                    onClearSelection={handleClearSelection}
                />
            )}

            {/* Todo List */}
            <TodoList
                selectedTodos={selectedTodos}
                onSelectTodo={handleSelectTodo}
                onSelectAll={handleSelectAll}
                onClearSelection={handleClearSelection}
            />

            {/* Export/Import */}
            <TodoExportImport />
        </div>
    );
}
