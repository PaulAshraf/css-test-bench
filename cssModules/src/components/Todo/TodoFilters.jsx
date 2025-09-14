import { useTodoFilters } from '../../hooks/useTodoFilters';
import styles from './TodoFilters.module.css';

export default function TodoFilters() {
    const {
        filter,
        searchTerm,
        selectedCategory,
        categories,
        setFilter,
        setSearchTerm,
        setSelectedCategory,
    } = useTodoFilters();

    const filterButtons = [
        { key: 'all', label: 'All', count: null },
        { key: 'active', label: 'Active', count: null },
        { key: 'completed', label: 'Completed', count: null },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.filtersRow}>
                {/* Search Input */}
                <div className={styles.searchContainer}>
                    <div className={styles.searchInputWrapper}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search todos..."
                            className={styles.searchInput}
                        />
                        <div className={styles.searchIcon}>
                            <svg className={styles.searchIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className={styles.filterButtons}>
                    {filterButtons.map((btn) => (
                        <button
                            key={btn.key}
                            onClick={() => setFilter(btn.key)}
                            className={`${styles.filterButton} ${filter === btn.key ? styles.filterButtonActive : styles.filterButtonInactive}`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                {/* Category Filter */}
                <div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={styles.categorySelect}
                    >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || selectedCategory !== 'all' || filter !== 'all') && (
                <div className={styles.activeFilters}>
                    {searchTerm && (
                        <span className={`${styles.filterTag} ${styles.filterTagSearch}`}>
                            Search: "{searchTerm}"
                            <button
                                onClick={() => setSearchTerm('')}
                                className={styles.filterTagButton}
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {selectedCategory !== 'all' && (
                        <span className={`${styles.filterTag} ${styles.filterTagCategory}`}>
                            Category: {selectedCategory}
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={styles.filterTagButton}
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {filter !== 'all' && (
                        <span className={`${styles.filterTag} ${styles.filterTagStatus}`}>
                            Status: {filter}
                            <button
                                onClick={() => setFilter('all')}
                                className={styles.filterTagButton}
                            >
                                ×
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
