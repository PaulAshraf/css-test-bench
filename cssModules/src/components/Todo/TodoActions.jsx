import { useTodoActions } from '../../hooks/useTodoActions';
import styles from './TodoActions.module.css';

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
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.selectedInfo}>
                    <span className={styles.selectedText}>
                        {selectedTodos.size} todo(s) selected
                    </span>
                </div>

                <div className={styles.actions}>
                    <button
                        onClick={handleBulkToggle}
                        className={`${styles.button} ${styles.toggleButton}`}
                    >
                        Toggle Status
                    </button>

                    <button
                        onClick={handleBulkDelete}
                        className={`${styles.button} ${styles.deleteButton}`}
                    >
                        Delete Selected
                    </button>

                    <button
                        onClick={onClearSelection}
                        className={`${styles.button} ${styles.clearButton}`}
                    >
                        Clear Selection
                    </button>
                </div>
            </div>
        </div>
    );
}
