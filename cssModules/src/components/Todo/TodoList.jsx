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
import styles from './TodoList.module.css';

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
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📝</div>
                <h3 className={styles.emptyTitle}>No todos found</h3>
                <p className={styles.emptyText}>Add a new todo to get started!</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* List Header */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <input
                        type="checkbox"
                        checked={allSelected}
                        ref={(input) => {
                            if (input) input.indeterminate = someSelected && !allSelected;
                        }}
                        onChange={handleSelectAll}
                        className={styles.checkbox}
                    />
                    <span className={styles.todoCount}>
                        {todos.length} todo(s)
                    </span>
                </div>

                <div className={styles.headerRight}>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={styles.sortSelect}
                    >
                        <option value="createdAt">Created Date</option>
                        <option value="text">Name</option>
                        <option value="priority">Priority</option>
                        <option value="category">Category</option>
                    </select>

                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className={styles.sortButton}
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
                    <div className={styles.todoItems}>
                        {sortedTodos.map((todo, index) => (
                            <div
                                key={todo.id}
                                className={styles.todoItemWrapper}
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
