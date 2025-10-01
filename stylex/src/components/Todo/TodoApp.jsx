import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import TodoForm from "./TodoForm";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";
import TodoActions from "./TodoActions";
import TodoExportImport from "./TodoExportImport";

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    rowGap: "1.5rem",
  },
});

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
    <div {...stylex.props(styles.root)}>
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
