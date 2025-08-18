export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function createTodo(text, category = 'Personal', priority = 'medium') {
    return {
        id: generateId(),
        text: text.trim(),
        completed: false,
        category,
        priority,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
}

export function filterTodos(todos, filter, searchTerm, selectedCategory) {
    let filtered = todos;

    // Filter by completion status
    if (filter === 'active') {
        filtered = filtered.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
        filtered = filtered.filter(todo => todo.completed);
    }

    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(todo =>
            todo.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
        filtered = filtered.filter(todo => todo.category === selectedCategory);
    }

    return filtered;
}

export function getTodoStats(todos) {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, active, completionRate };
}

export function groupTodosByCategory(todos) {
    return todos.reduce((groups, todo) => {
        const category = todo.category;
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(todo);
        return groups;
    }, {});
}

export function sortTodos(todos, sortBy = 'createdAt', order = 'desc') {
    return [...todos].sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        }

        if (sortBy === 'priority') {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            aValue = priorityOrder[aValue] || 0;
            bValue = priorityOrder[bValue] || 0;
        }

        if (order === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });
}

export function exportTodos(todos) {
    const data = {
        todos,
        exportDate: new Date().toISOString(),
        version: '1.0',
    };
    return JSON.stringify(data, null, 2);
}

export function importTodos(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        if (data.todos && Array.isArray(data.todos)) {
            return data.todos;
        }
        throw new Error('Invalid format');
    } catch (error) {
        throw new Error('Failed to parse JSON: ' + error.message);
    }
}
