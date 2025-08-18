import { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTodoFilters } from '../../hooks/useTodoFilters';
import { useTodoActions } from '../../hooks/useTodoActions';
import TodoItem from './TodoItem';

export default function TodoList({ selectedTodos, onSelectTodo, onSelectAll, onClearSelection }) {
    const { todos, allTodos } = useTodoFilters();
    const { reorderTodos } = useTodoActions();
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const allSelected = todos.length > 0 && todos.every(todo => selectedTodos.has(todo.id));
    const someSelected = todos.some(todo => selectedTodos.has(todo.id));

    const handleSelectAll = () => {
        if (allSelected) {
            onClearSelection();
        } else {
            onSelectAll(todos.map(todo => todo.id));
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = allTodos.findIndex(todo => todo.id === active.id);
            const newIndex = allTodos.findIndex(todo => todo.id === over.id);

            const newOrder = arrayMove(allTodos, oldIndex, newIndex);
            reorderTodos(newOrder);
        }
    };

    const sortedTodos = [...todos].sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === 'createdAt') {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        }

        if (sortBy === 'priority') {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            aValue = priorityOrder[aValue] || 0;
            bValue = priorityOrder[bValue] || 0;
        }

        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    if (todos.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No todos found</h3>
                <p className="text-gray-500">Add a new todo to get started!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* List Header */}
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        checked={allSelected}
                        ref={(input) => {
                            if (input) input.indeterminate = someSelected && !allSelected;
                        }}
                        onChange={handleSelectAll}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                        {todos.length} todo(s)
                    </span>
                </div>

                <div className="flex items-center space-x-2">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                        <option value="createdAt">Created Date</option>
                        <option value="text">Name</option>
                        <option value="priority">Priority</option>
                        <option value="category">Category</option>
                    </select>

                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="text-sm text-gray-600 hover:text-gray-800 px-2 py-1"
                        title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                    >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
            </div>

            {/* Todo Items */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={sortedTodos.map(todo => todo.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-2">
                        {sortedTodos.map((todo, index) => (
                            <div
                                key={todo.id}
                                className="animate-fade-in"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <TodoItem
                                    todo={todo}
                                    isSelected={selectedTodos.has(todo.id)}
                                    onSelect={() => onSelectTodo(todo.id)}
                                />
                            </div>
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
