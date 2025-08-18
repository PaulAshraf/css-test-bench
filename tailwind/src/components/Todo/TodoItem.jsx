import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTodoActions } from '../../hooks/useTodoActions';

export default function TodoItem({ todo, isSelected, onSelect }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [editCategory, setEditCategory] = useState(todo.category);
    const [editPriority, setEditPriority] = useState(todo.priority);

    const { updateTodo, deleteTodo, toggleTodo } = useTodoActions();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: todo.id });

    const priorityColors = {
        high: 'bg-red-100 text-red-800 border-red-200',
        medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        low: 'bg-green-100 text-green-800 border-green-200',
    };

    const categoryColors = {
        Work: 'bg-blue-100 text-blue-800',
        Personal: 'bg-purple-100 text-purple-800',
        Shopping: 'bg-pink-100 text-pink-800',
        Health: 'bg-emerald-100 text-emerald-800',
    };

    const handleSave = () => {
        if (editText.trim()) {
            updateTodo(todo.id, {
                text: editText.trim(),
                category: editCategory,
                priority: editPriority,
            });
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditText(todo.text);
        setEditCategory(todo.category);
        setEditPriority(todo.priority);
        setIsEditing(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`bg-white border rounded-lg p-4 transition-all duration-200 hover:shadow-md transform hover:-translate-y-1 ${isSelected ? 'ring-2 ring-blue-500 border-blue-200 shadow-lg' : 'border-gray-200'
                } ${todo.completed ? 'opacity-75' : ''} ${isDragging ? 'z-50 rotate-3 scale-105' : ''}`}
        >
            <div className="flex items-start space-x-3">
                {/* Selection Checkbox */}
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={onSelect}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />

                {/* Completion Checkbox */}
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="mt-1 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />

                {/* Drag Handle */}
                <div
                    {...attributes}
                    {...listeners}
                    className="mt-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors"
                    title="Drag to reorder"
                >
                    ⋮⋮
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                autoFocus
                            />

                            <div className="flex space-x-2">
                                <select
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
                                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                >
                                    <option value="Work">Work</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Health">Health</option>
                                </select>

                                <select
                                    value={editPriority}
                                    onChange={(e) => setEditPriority(e.target.value)}
                                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={handleSave}
                                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-start justify-between">
                                <p className={`text-gray-900 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                                    {todo.text}
                                </p>

                                <div className="flex items-center space-x-1 ml-2">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-gray-400 hover:text-blue-600 transition-colors"
                                        title="Edit"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="text-gray-400 hover:text-red-600 transition-colors"
                                        title="Delete"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center space-x-2">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${categoryColors[todo.category] || 'bg-gray-100 text-gray-800'}`}>
                                        {todo.category}
                                    </span>

                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${priorityColors[todo.priority]}`}>
                                        {todo.priority} priority
                                    </span>
                                </div>

                                <span className="text-xs text-gray-500">
                                    {formatDate(todo.createdAt)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
