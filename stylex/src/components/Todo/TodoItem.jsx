import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTodoActions } from "../../hooks/useTodoActions";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  card: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "0.5rem",
    padding: "1rem",
    transitionProperty: "box-shadow, transform, opacity",
    transitionDuration: "200ms",
    ":hover": {
      boxShadow:
        "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
      transform: "translateY(-0.25rem)",
    },
  },
  selectedRing: {
    boxShadow: "0 0 0 2px rgba(59,130,246,1), 0 10px 15px -3px rgba(0,0,0,0.1)",
    borderColor: "#BFDBFE",
  },
  completed: { opacity: 0.75 },
  dragging: { zIndex: 50, transform: "rotate(3deg) scale(1.05)" },
  rowStart: { display: "flex", alignItems: "flex-start", columnGap: "0.75rem" },
  checkbox: {
    marginTop: "0.25rem",
    height: "1rem",
    width: "1rem",
    border: "1px solid #D1D5DB",
    borderRadius: "0.25rem",
    outline: "none",
  },
  checkboxBlue: {
    color: "#2563EB",
    ":focus": { boxShadow: "0 0 0 2px rgba(59,130,246,0.5)" },
  },
  checkboxGreen: {
    color: "#16A34A",
    ":focus": { boxShadow: "0 0 0 2px rgba(34,197,94,0.5)" },
  },
  dragHandle: {
    marginTop: "0.25rem",
    cursor: "grab",
    color: "#9CA3AF",
    transition: "color 150ms",
    ":active": { cursor: "grabbing" },
    ":hover": { color: "#4B5563" },
  },
  flex1: { flex: 1, minWidth: 0 },
  editCol: { display: "flex", flexDirection: "column", rowGap: "0.75rem" },
  input: {
    width: "100%",
    paddingInline: "0.75rem",
    paddingBlock: "0.5rem",
    border: "1px solid #D1D5DB",
    borderRadius: "0.375rem",
    outline: "none",
    ":focus": {
      boxShadow: "0 0 0 2px rgba(59,130,246,0.5)",
      borderColor: "transparent",
    },
  },
  selectsRow: { display: "flex", columnGap: "0.5rem" },
  select: {
    paddingInline: "0.5rem",
    paddingBlock: "0.25rem",
    fontSize: "0.875rem",
    border: "1px solid #D1D5DB",
    borderRadius: "0.25rem",
    outline: "none",
    ":focus": {
      boxShadow: "0 0 0 2px rgba(59,130,246,0.5)",
      borderColor: "transparent",
    },
  },
  actionsRow: { display: "flex", columnGap: "0.5rem" },
  btn: {
    paddingInline: "0.75rem",
    paddingBlock: "0.25rem",
    fontSize: "0.875rem",
    color: "#FFFFFF",
    borderRadius: "0.25rem",
    border: 0,
    cursor: "pointer",
    transition: "background-color 150ms",
  },
  btnGreen: {
    backgroundColor: "#16A34A",
    ":hover": { backgroundColor: "#15803D" },
  },
  btnGray: {
    backgroundColor: "#4B5563",
    ":hover": { backgroundColor: "#374151" },
  },
  viewRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  title: { color: "#111827" },
  titleCompleted: { textDecorationLine: "line-through", color: "#6B7280" },
  actions: {
    display: "flex",
    alignItems: "center",
    columnGap: "0.25rem",
    marginLeft: "0.5rem",
  },
  icon: {
    color: "#9CA3AF",
    transition: "color 150ms",
    background: "transparent",
    border: 0,
    cursor: "pointer",
    ":hover": { color: "#2563EB" },
  },
  iconDelete: { ":hover": { color: "#DC2626" } },
  metaRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "0.5rem",
  },
  tags: { display: "flex", alignItems: "center", columnGap: "0.5rem" },
  chip: {
    display: "inline-flex",
    paddingInline: "0.5rem",
    paddingBlock: "0.25rem",
    fontSize: "0.75rem",
    fontWeight: 600,
    borderRadius: "9999px",
  },
  date: { fontSize: "0.75rem", color: "#6B7280" },
});

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

  const priorityStyles = {
    high: {
      backgroundColor: "#FEE2E2",
      color: "#991B1B",
      border: "1px solid #FECACA",
    },
    medium: {
      backgroundColor: "#FEF3C7",
      color: "#92400E",
      border: "1px solid #FDE68A",
    },
    low: {
      backgroundColor: "#DCFCE7",
      color: "#166534",
      border: "1px solid #BBF7D0",
    },
  };

  const categoryStyles = {
    Work: { backgroundColor: "#DBEAFE", color: "#1E40AF" },
    Personal: { backgroundColor: "#E9D5FF", color: "#6D28D9" },
    Shopping: { backgroundColor: "#FCE7F3", color: "#9D174D" },
    Health: { backgroundColor: "#D1FAE5", color: "#065F46" },
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
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
      {...stylex.props(
        styles.card,
        isSelected && styles.selectedRing,
        todo.completed && styles.completed,
        isDragging && styles.dragging
      )}
    >
      <div {...stylex.props(styles.rowStart)}>
        {/* Selection Checkbox */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          {...stylex.props(styles.checkbox, styles.checkboxBlue)}
        />

        {/* Completion Checkbox */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          {...stylex.props(styles.checkbox, styles.checkboxGreen)}
        />

        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          {...stylex.props(styles.dragHandle)}
          title="Drag to reorder"
        >
          ⋮⋮
        </div>

        {/* Content */}
        <div {...stylex.props(styles.flex1)}>
          {isEditing ? (
            <div {...stylex.props(styles.editCol)}>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                {...stylex.props(styles.input)}
                autoFocus
              />

              <div {...stylex.props(styles.selectsRow)}>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  {...stylex.props(styles.select)}
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Health">Health</option>
                </select>

                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  {...stylex.props(styles.select)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div {...stylex.props(styles.actionsRow)}>
                <button
                  onClick={handleSave}
                  {...stylex.props(styles.btn, styles.btnGreen)}
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  {...stylex.props(styles.btn, styles.btnGray)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div {...stylex.props(styles.viewRow)}>
                <p
                  {...stylex.props(
                    styles.title,
                    todo.completed && styles.titleCompleted
                  )}
                >
                  {todo.text}
                </p>

                <div {...stylex.props(styles.actions)}>
                  <button
                    onClick={() => setIsEditing(true)}
                    {...stylex.props(styles.icon)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    {...stylex.props(styles.icon, styles.iconDelete)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div {...stylex.props(styles.metaRow)}>
                <div {...stylex.props(styles.tags)}>
                  <span
                    {...stylex.props(styles.chip)}
                    style={
                      categoryStyles[todo.category] || {
                        backgroundColor: "#F3F4F6",
                        color: "#1F2937",
                      }
                    }
                  >
                    {todo.category}
                  </span>

                  <span
                    {...stylex.props(styles.chip)}
                    style={priorityStyles[todo.priority]}
                  >
                    {todo.priority} priority
                  </span>
                </div>

                <span {...stylex.props(styles.date)}>
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
