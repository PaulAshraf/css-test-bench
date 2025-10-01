import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTodoFilters } from "../../hooks/useTodoFilters";
import { useTodoActions } from "../../hooks/useTodoActions";
import TodoItem from "./TodoItem";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  empty: { textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem" },
  emptyIcon: { fontSize: "3.75rem", marginBottom: "1rem" },
  emptyTitle: {
    fontSize: "1.125rem",
    fontWeight: 500,
    color: "#374151",
    marginBottom: "0.5rem",
  },
  emptyText: { color: "#6B7280" },
  listWrap: { display: "flex", flexDirection: "column", rowGap: "1rem" },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    borderRadius: "0.5rem",
    padding: "1rem",
  },
  headerLeft: { display: "flex", alignItems: "center", columnGap: "0.75rem" },
  checkbox: {
    height: "1rem",
    width: "1rem",
    color: "#2563EB",
    border: "1px solid #D1D5DB",
    borderRadius: "0.25rem",
    ":focus": { boxShadow: "0 0 0 2px rgba(59,130,246,0.5)" },
  },
  count: { fontSize: "0.875rem", fontWeight: 500, color: "#374151" },
  controls: { display: "flex", alignItems: "center", columnGap: "0.5rem" },
  select: {
    fontSize: "0.875rem",
    border: "1px solid #D1D5DB",
    borderRadius: "0.375rem",
    paddingInline: "0.5rem",
    paddingBlock: "0.25rem",
    outline: "none",
    ":focus": {
      boxShadow: "0 0 0 2px rgba(59,130,246,0.5)",
      borderColor: "transparent",
    },
  },
  sortBtn: {
    fontSize: "0.875rem",
    color: "#4B5563",
    paddingInline: "0.5rem",
    paddingBlock: "0.25rem",
    ":hover": { color: "#1F2937" },
  },
  items: { display: "flex", flexDirection: "column", rowGap: "0.5rem" },
});

export default function TodoList({
  selectedTodos,
  onSelectTodo,
  onSelectAll,
  onClearSelection,
}) {
  const { todos, allTodos } = useTodoFilters();
  const { reorderTodos } = useTodoActions();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const allSelected =
    todos.length > 0 && todos.every((todo) => selectedTodos.has(todo.id));
  const someSelected = todos.some((todo) => selectedTodos.has(todo.id));

  const handleSelectAll = () => {
    if (allSelected) {
      onClearSelection();
    } else {
      onSelectAll(todos.map((todo) => todo.id));
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = allTodos.findIndex((todo) => todo.id === active.id);
      const newIndex = allTodos.findIndex((todo) => todo.id === over.id);

      const newOrder = arrayMove(allTodos, oldIndex, newIndex);
      reorderTodos(newOrder);
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === "createdAt") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      aValue = priorityOrder[aValue] || 0;
      bValue = priorityOrder[bValue] || 0;
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  if (todos.length === 0) {
    return (
      <div {...stylex.props(styles.empty)}>
        <div {...stylex.props(styles.emptyIcon)}>📝</div>
        <h3 {...stylex.props(styles.emptyTitle)}>No todos found</h3>
        <p {...stylex.props(styles.emptyText)}>
          Add a new todo to get started!
        </p>
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.listWrap)}>
      {/* List Header */}
      <div {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.headerLeft)}>
          <input
            type="checkbox"
            checked={allSelected}
            ref={(input) => {
              if (input) input.indeterminate = someSelected && !allSelected;
            }}
            onChange={handleSelectAll}
            {...stylex.props(styles.checkbox)}
          />
          <span {...stylex.props(styles.count)}>{todos.length} todo(s)</span>
        </div>

        <div {...stylex.props(styles.controls)}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            {...stylex.props(styles.select)}
          >
            <option value="createdAt">Created Date</option>
            <option value="text">Name</option>
            <option value="priority">Priority</option>
            <option value="category">Category</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            {...stylex.props(styles.sortBtn)}
            title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
          >
            {sortOrder === "asc" ? "↑" : "↓"}
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
          items={sortedTodos.map((todo) => todo.id)}
          strategy={verticalListSortingStrategy}
        >
          <div {...stylex.props(styles.items)}>
            {sortedTodos.map((todo, index) => (
              <div key={todo.id} style={{ animationDelay: `${index * 50}ms` }}>
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
