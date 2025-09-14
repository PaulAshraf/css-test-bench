import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({ size = 'md', className = '' }) {
    const getSizeClass = (size) => {
        switch (size) {
            case 'sm': return styles.spinnerSm;
            case 'md': return styles.spinnerMd;
            case 'lg': return styles.spinnerLg;
            case 'xl': return styles.spinnerXl;
            default: return styles.spinnerMd;
        }
    };

    return (
        <div className={`${styles.spinner} ${getSizeClass(size)} ${className}`}>
            <svg className={styles.svg} viewBox="0 0 24 24">
                <circle
                    className={styles.circle}
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                />
                <path
                    className={styles.path}
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        </div>
    );
}
