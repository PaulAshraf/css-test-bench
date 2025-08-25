import { useTodoActions } from "../../hooks/useTodoActions";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  card: {
    backgroundColor: "#FFFBEB",
    border: "1px solid #FEF3C7",
    borderRadius: "0.5rem",
    padding: "1rem",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: { fontSize: "0.875rem", fontWeight: 500, color: "#92400E" },
  actions: { display: "flex", alignItems: "center", columnGap: "0.5rem" },
  btn: {
    paddingInline: "0.75rem",
    paddingBlock: "0.25rem",
    fontSize: "0.875rem",
    color: "#FFFFFF",
    borderRadius: "0.375rem",
    border: 0,
    cursor: "pointer",
    transition: "background-color 150ms",
  },
  blue: {
    backgroundColor: "#2563EB",
    ":hover": { backgroundColor: "#1D4ED8" },
  },
  red: { backgroundColor: "#DC2626", ":hover": { backgroundColor: "#B91C1C" } },
  gray: {
    backgroundColor: "#4B5563",
    ":hover": { backgroundColor: "#374151" },
  },
});

export default function TodoActions({ selectedTodos, onClearSelection }) {
  const { bulkDelete, bulkToggle } = useTodoActions();

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedTodos.size} selected todo(s)?`)) {
      bulkDelete(Array.from(selectedTodos));
      onClearSelection();
    }
  };

  const handleBulkToggle = () => {
    bulkToggle(Array.from(selectedTodos));
    onClearSelection();
  };

  return (
    <div {...stylex.props(styles.card)}>
      <div {...stylex.props(styles.row)}>
        <div
          style={{ display: "flex", alignItems: "center", columnGap: "0.5rem" }}
        >
          <span {...stylex.props(styles.text)}>
            {selectedTodos.size} todo(s) selected
          </span>
        </div>

        <div {...stylex.props(styles.actions)}>
          <button
            onClick={handleBulkToggle}
            {...stylex.props(styles.btn, styles.blue)}
          >
            Toggle Status
          </button>
          <button
            onClick={handleBulkDelete}
            {...stylex.props(styles.btn, styles.red)}
          >
            Delete Selected
          </button>
          <button
            onClick={onClearSelection}
            {...stylex.props(styles.btn, styles.gray)}
          >
            Clear Selection
          </button>
        </div>
      </div>
    </div>
  );
}
