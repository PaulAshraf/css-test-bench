import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { useTodoActions } from "../../hooks/useTodoActions";
import { useTodoFilters } from "../../hooks/useTodoFilters";

const styles = stylex.create({
  card: {
    backgroundColor: "#F9FAFB",
    borderRadius: "0.5rem",
    padding: "1.5rem",
  },
  column: { display: "flex", flexDirection: "column", rowGap: "1rem" },
  row: { display: "flex", columnGap: "0.75rem", alignItems: "stretch" },
  textInput: {
    flex: 1,
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D1D5DB",
    borderRadius: "0.5rem",
    outline: "none",
    transition: "box-shadow 150ms, border-color 150ms, color 150ms",
    ":focus": {
      boxShadow: "0 0 0 2px rgba(59,130,246,0.5)",
      borderColor: "transparent",
    },
  },
  iconButton: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    color: "#4B5563",
    transition: "color 150ms",
    backgroundColor: "transparent",
    border: 0,
    ":hover": { color: "#1F2937" },
  },
  submitButton: {
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    backgroundColor: "#2563EB",
    color: "#FFFFFF",
    borderRadius: "0.5rem",
    border: 0,
    cursor: "pointer",
    fontWeight: 500,
    transition: "background-color 150ms, opacity 150ms",
    ":hover": { backgroundColor: "#1D4ED8" },
    ":disabled": { backgroundColor: "#9CA3AF", cursor: "not-allowed" },
  },
  advancedRow: {
    display: "flex",
    columnGap: "1rem",
    paddingTop: "0.5rem",
    borderTop: "1px solid #E5E7EB",
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#374151",
    marginBottom: "0.25rem",
  },
  select: {
    width: "100%",
    paddingLeft: "0.75rem",
    paddingRight: "0.75rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D1D5DB",
    borderRadius: "0.375rem",
    outline: "none",
    transition: "box-shadow 150ms, border-color 150ms",
    ":focus": {
      boxShadow: "0 0 0 2px rgba(59,130,246,0.5)",
      borderColor: "transparent",
    },
  },
});

export default function TodoForm() {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState("medium");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { addTodo } = useTodoActions();
  const { categories } = useTodoFilters();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addTodo(text, category, priority);
    setText("");
    setShowAdvanced(false);
  };

  return (
    <form onSubmit={handleSubmit} {...stylex.props(styles.card)}>
      <div {...stylex.props(styles.column)}>
        {/* Main Input */}
        <div {...stylex.props(styles.row)}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            aria-label="Add new todo"
            autoComplete="off"
            {...stylex.props(styles.textInput)}
          />
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            title="Advanced options"
            {...stylex.props(styles.iconButton)}
          >
            ⚙️
          </button>
          <button
            type="submit"
            disabled={!text.trim()}
            {...stylex.props(styles.submitButton)}
          >
            Add Todo
          </button>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div {...stylex.props(styles.advancedRow)}>
            <div style={{ flex: 1 }}>
              <label {...stylex.props(styles.label)}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                {...stylex.props(styles.select)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label {...stylex.props(styles.label)}>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                {...stylex.props(styles.select)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
