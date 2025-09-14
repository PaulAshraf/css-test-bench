import { useTodoFilters } from '../../hooks/useTodoFilters';
import styles from './AppLayout.module.css';

export default function AppLayout({ children }) {
    const { stats } = useTodoFilters();

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                {/* Header */}
                <header className={styles.header}>
                    <h1 className={styles.title}>
                        Todo App - CSS Modules
                    </h1>
                    <p className={styles.subtitle}>
                        Manage your tasks with style and efficiency
                    </p>

                    {/* Stats Bar */}
                    <div className={styles.statsContainer}>
                        <div className={styles.statCard}>
                            <span className={styles.statLabel}>Total</span>
                            <div className={`${styles.statValue} ${styles.statValueTotal}`}>{stats.total}</div>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statLabel}>Active</span>
                            <div className={`${styles.statValue} ${styles.statValueActive}`}>{stats.active}</div>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statLabel}>Completed</span>
                            <div className={`${styles.statValue} ${styles.statValueCompleted}`}>{stats.completed}</div>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statLabel}>Progress</span>
                            <div className={`${styles.statValue} ${styles.statValueProgress}`}>{stats.completionRate}%</div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className={styles.main}>
                    {children}
                </main>

                {/* Footer */}
                <footer className={styles.footer}>
                    Built with React, Vite, and CSS Modules
                </footer>
            </div>
        </div>
    );
}
