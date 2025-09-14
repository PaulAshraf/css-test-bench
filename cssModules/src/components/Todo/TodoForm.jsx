import { useState } from 'react';
import { useTodoActions } from '../../hooks/useTodoActions';
import { useTodoFilters } from '../../hooks/useTodoFilters';
import styles from './TodoForm.module.css';

export default function TodoForm() {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('Personal');
    const [priority, setPriority] = useState('medium');
    const [showAdvanced, setShowAdvanced] = useState(false);

    const { addTodo } = useTodoActions();
    const { categories } = useTodoFilters();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        addTodo(text, category, priority);
        setText('');
        setShowAdvanced(false);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.container}>
                {/* Main Input */}
                <div className={styles.inputRow}>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="What needs to be done?"
                        className={styles.input}
                        aria-label="Add new todo"
                        autoComplete="off"
                    />
                    <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className={styles.advancedButton}
                        title="Advanced options"
                    >
                        ⚙️
                    </button>
                    <button
                        type="submit"
                        disabled={!text.trim()}
                        className={styles.submitButton}
                    >
                        Add Todo
                    </button>
                </div>

                {/* Advanced Options */}
                {showAdvanced && (
                    <div className={styles.advancedOptions}>
                        <div className={styles.selectGroup}>
                            <label className={styles.label}>
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={styles.select}
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.selectGroup}>
                            <label className={styles.label}>
                                Priority
                            </label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className={styles.select}
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
