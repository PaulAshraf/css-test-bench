import { useTodos } from '../contexts/TodoContext';
import { createTodo } from '../utils/todoUtils';

export function useTodoActions() {
    const { dispatch } = useTodos();

    const addTodo = (text, category = 'Personal', priority = 'medium') => {
        if (!text.trim()) return;

        const newTodo = createTodo(text, category, priority);
        dispatch({ type: 'ADD_TODO', payload: newTodo });
    };

    const updateTodo = (id, updates) => {
        dispatch({
            type: 'UPDATE_TODO',
            payload: {
                id,
                ...updates,
                updatedAt: new Date().toISOString(),
            },
        });
    };

    const deleteTodo = (id) => {
        dispatch({ type: 'DELETE_TODO', payload: id });
    };

    const toggleTodo = (id) => {
        dispatch({ type: 'TOGGLE_TODO', payload: id });
    };

    const bulkDelete = (ids) => {
        dispatch({ type: 'BULK_DELETE', payload: ids });
    };

    const bulkToggle = (ids) => {
        dispatch({ type: 'BULK_TOGGLE', payload: ids });
    };

    const reorderTodos = (newOrder) => {
        dispatch({ type: 'REORDER_TODOS', payload: newOrder });
    };

    return {
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        bulkDelete,
        bulkToggle,
        reorderTodos,
    };
}
