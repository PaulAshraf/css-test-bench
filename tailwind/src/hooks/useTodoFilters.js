import { useTodos } from '../contexts/TodoContext';
import { filterTodos, getTodoStats } from '../utils/todoUtils';

export function useTodoFilters() {
    const { state, dispatch } = useTodos();

    const setFilter = (filter) => {
        dispatch({ type: 'SET_FILTER', payload: filter });
    };

    const setSearchTerm = (searchTerm) => {
        dispatch({ type: 'SET_SEARCH_TERM', payload: searchTerm });
    };

    const setSelectedCategory = (category) => {
        dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
    };

    const filteredTodos = filterTodos(
        state.todos,
        state.filter,
        state.searchTerm,
        state.selectedCategory
    );

    const stats = getTodoStats(state.todos);

    return {
        todos: filteredTodos,
        allTodos: state.todos,
        filter: state.filter,
        searchTerm: state.searchTerm,
        selectedCategory: state.selectedCategory,
        categories: state.categories,
        stats,
        setFilter,
        setSearchTerm,
        setSelectedCategory,
    };
}
