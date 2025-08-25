import { createContext, useContext, useReducer, useEffect } from 'react';

const TodoContext = createContext();

const initialState = {
    todos: [],
    filter: 'all', // all, active, completed
    searchTerm: '',
    selectedCategory: 'all',
    categories: ['Work', 'Personal', 'Shopping', 'Health'],
};

function todoReducer(state, action) {
    switch (action.type) {
        case 'SET_TODOS':
            return { ...state, todos: action.payload };
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload] };
        case 'UPDATE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? action.payload : todo
                ),
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload),
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload
                        ? { ...todo, completed: !todo.completed }
                        : todo
                ),
            };
        case 'SET_FILTER':
            return { ...state, filter: action.payload };
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload };
        case 'SET_SELECTED_CATEGORY':
            return { ...state, selectedCategory: action.payload };
        case 'BULK_DELETE':
            return {
                ...state,
                todos: state.todos.filter(todo => !action.payload.includes(todo.id)),
            };
        case 'BULK_TOGGLE':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    action.payload.includes(todo.id)
                        ? { ...todo, completed: !todo.completed }
                        : todo
                ),
            };
        case 'REORDER_TODOS':
            return { ...state, todos: action.payload };
        default:
            return state;
    }
}

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    // Load todos from localStorage on mount
    useEffect(() => {
        const savedTodos = localStorage.getItem('tailwind-todos');
        if (savedTodos) {
            dispatch({ type: 'SET_TODOS', payload: JSON.parse(savedTodos) });
        }
    }, []);

    // Save todos to localStorage whenever todos change
    useEffect(() => {
        localStorage.setItem('tailwind-todos', JSON.stringify(state.todos));
    }, [state.todos]);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
}

export function useTodos() {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodos must be used within a TodoProvider');
    }
    return context;
}
