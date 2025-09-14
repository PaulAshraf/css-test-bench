import { useRef } from 'react';
import { useTodos } from '../../contexts/TodoContext';
import { useTodoFilters } from '../../hooks/useTodoFilters';
import { exportTodos, importTodos } from '../../utils/todoUtils';
import styles from './TodoExportImport.module.css';

export default function TodoExportImport() {
    const fileInputRef = useRef(null);
    const { dispatch } = useTodos();
    const { allTodos } = useTodoFilters();

    const handleExport = () => {
        try {
            const exportData = exportTodos(allTodos);
            const blob = new Blob([exportData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `todos-export-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        } catch (error) {
            alert('Failed to export todos: ' + error.message);
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
                dispatch({ type: 'SET_TODOS', payload: importedTodos });
            }
        } catch (error) {
            alert('Failed to import todos: ' + error.message);
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Data Management</h3>

            <div className={styles.buttonRow}>
                <button
                    onClick={handleExport}
                    disabled={allTodos.length === 0}
                    className={`${styles.button} ${styles.exportButton}`}
                >
                    <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export Todos ({allTodos.length})
                </button>

                <button
                    onClick={handleImportClick}
                    className={`${styles.button} ${styles.importButton}`}
                >
                    <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    Import Todos
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className={styles.hiddenInput}
                />
            </div>

            <div className={styles.infoText}>
                <p>• Export saves all your todos to a JSON file</p>
                <p>• Import replaces current todos with data from a JSON file</p>
            </div>
        </div>
    );
}
