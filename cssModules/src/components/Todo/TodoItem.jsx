import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTodoActions } from '../../hooks/useTodoActions';
import styles from './TodoItem.module.css';

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

    const getCategoryClass = (category) => {
        switch (category) {
            case 'Work': return styles.categoryWork;
            case 'Personal': return styles.categoryPersonal;
            case 'Shopping': return styles.categoryShopping;
            case 'Health': return styles.categoryHealth;
            default: return styles.categoryDefault;
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'high': return styles.priorityHigh;
            case 'medium': return styles.priorityMedium;
            case 'low': return styles.priorityLow;
            default: return styles.priorityLow;
        }
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

    const containerClasses = [
        styles.container,
        isSelected && styles.containerSelected,
        todo.completed && styles.containerCompleted,
        isDragging && styles.containerDragging
    ].filter(Boolean).join(' ');

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={containerClasses}
        >
            <div className={styles.itemContent}>
                {/* Selection Checkbox */}
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={onSelect}
                    className={`${styles.checkbox} ${styles.selectionCheckbox}`}
                />

                {/* Completion Checkbox */}
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className={`${styles.checkbox} ${styles.completionCheckbox}`}
                />

                {/* Drag Handle */}
                <div
                    {...attributes}
                    {...listeners}
                    className={styles.dragHandle}
                    title="Drag to reorder"
                >
                    ⋮⋮
                </div>

                {/* Content */}
                <div className={styles.content}>
                    {isEditing ? (
                        <div className={styles.editForm}>
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className={styles.editInput}
                                autoFocus
                            />

                            <div className={styles.editSelects}>
                                <select
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
                                    className={styles.editSelect}
                                >
                                    <option value="Work">Work</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Health">Health</option>
                                </select>

                                <select
                                    value={editPriority}
                                    onChange={(e) => setEditPriority(e.target.value)}
                                    className={styles.editSelect}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>

                            <div className={styles.editButtons}>
                                <button
                                    onClick={handleSave}
                                    className={`${styles.editButton} ${styles.saveButton}`}
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className={`${styles.editButton} ${styles.cancelButton}`}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.viewContent}>
                            <div className={styles.textRow}>
                                <p className={`${styles.text} ${todo.completed ? styles.textCompleted : ''}`}>
                                    {todo.text}
                                </p>

                                <div className={styles.actions}>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className={`${styles.actionButton} ${styles.editActionButton}`}
                                        title="Edit"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className={`${styles.actionButton} ${styles.deleteActionButton}`}
                                        title="Delete"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>

                            <div className={styles.metaRow}>
                                <div className={styles.tags}>
                                    <span className={`${styles.tag} ${styles.categoryTag} ${getCategoryClass(todo.category)}`}>
                                        {todo.category}
                                    </span>

                                    <span className={`${styles.tag} ${styles.priorityTag} ${getPriorityClass(todo.priority)}`}>
                                        {todo.priority} priority
                                    </span>
                                </div>

                                <span className={styles.timestamp}>
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
