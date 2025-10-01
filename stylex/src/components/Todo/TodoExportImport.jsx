import { useRef } from "react";
import { useTodos } from "../../contexts/TodoContext";
import { useTodoFilters } from "../../hooks/useTodoFilters";
import { exportTodos, importTodos } from "../../utils/todoUtils";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  card: { backgroundColor: "#F9FAFB", borderRadius: "0.5rem", padding: "1rem" },
  title: {
    fontSize: "1.125rem",
    fontWeight: 500,
    color: "#111827",
    marginBottom: "1rem",
  },
  row: {
    display: "flex",
    flexDirection: "column",
    rowGap: "0.75rem",
    "@media (min-width: 640px)": { flexDirection: "row", columnGap: "0.75rem" },
  },
  primary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingInline: "1rem",
    paddingBlock: "0.5rem",
    backgroundColor: "#2563EB",
    color: "#FFFFFF",
    borderRadius: "0.5rem",
    border: 0,
    cursor: "pointer",
    transition: "background-color 150ms",
    ":hover": { backgroundColor: "#1D4ED8" },
    ":disabled": { backgroundColor: "#9CA3AF", cursor: "not-allowed" },
  },
  success: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingInline: "1rem",
    paddingBlock: "0.5rem",
    backgroundColor: "#16A34A",
    color: "#FFFFFF",
    borderRadius: "0.5rem",
    border: 0,
    cursor: "pointer",
    transition: "background-color 150ms",
    ":hover": { backgroundColor: "#15803D" },
  },
  hidden: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  help: { marginTop: "0.75rem", fontSize: "0.875rem", color: "#4B5563" },
});

export default function TodoExportImport() {
  const fileInputRef = useRef(null);
  const { dispatch } = useTodos();
  const { allTodos } = useTodoFilters();

  const handleExport = () => {
    try {
      const exportData = exportTodos(allTodos);
      const blob = new Blob([exportData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `todos-export-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      alert("Failed to export todos: " + error.message);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importedTodos = importTodos(text);

      const confirmMessage = `This will import ${importedTodos.length} todos. Current todos will be replaced. Continue?`;
      if (window.confirm(confirmMessage)) {
        dispatch({ type: "SET_TODOS", payload: importedTodos });
      }
    } catch (error) {
      alert("Failed to import todos: " + error.message);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div {...stylex.props(styles.card)}>
      <h3 {...stylex.props(styles.title)}>Data Management</h3>

      <div {...stylex.props(styles.row)}>
        <button
          onClick={handleExport}
          disabled={allTodos.length === 0}
          {...stylex.props(styles.primary)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            style={{ marginRight: 8 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Export Todos ({allTodos.length})
        </button>

        <button onClick={handleImportClick} {...stylex.props(styles.success)}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            style={{ marginRight: 8 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
            />
          </svg>
          Import Todos
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          {...stylex.props(styles.hidden)}
        />
      </div>

      <div {...stylex.props(styles.help)}>
        <p style={{ marginBottom: "0.25rem" }}>
          • Export saves all your todos to a JSON file
        </p>
        <p>• Import replaces current todos with data from a JSON file</p>
      </div>
    </div>
  );
}
