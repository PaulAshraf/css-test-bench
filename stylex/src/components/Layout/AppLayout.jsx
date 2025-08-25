import { useTodoFilters } from "../../hooks/useTodoFilters";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  app: {
    minHeight: "100vh",
    backgroundImage: "linear-gradient(225deg, #EFF6FF, #FFFFFF 40%, #F3E8FF)",
  },
  container: {
    maxWidth: "56rem",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "2rem",
    paddingBottom: "2rem",
  },
  header: {
    marginBottom: "2rem",
    textAlign: "center",
  },
  title: {
    fontSize: "2.25rem",
    lineHeight: 1.1,
    fontWeight: 700,
    color: "#1F2937",
    marginBottom: "0.5rem",
  },
  subtitle: {
    color: "#4B5563",
  },
  statsBar: {
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "center",
    columnGap: "1.5rem",
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
  },
  statLabel: {
    fontSize: "0.875rem",
    color: "#6B7280",
  },
  statValueBlue: { color: "#2563EB", fontWeight: 700, fontSize: "1.5rem" },
  statValueOrange: { color: "#EA580C", fontWeight: 700, fontSize: "1.5rem" },
  statValueGreen: { color: "#16A34A", fontWeight: 700, fontSize: "1.5rem" },
  statValuePurple: { color: "#7C3AED", fontWeight: 700, fontSize: "1.5rem" },
  main: {
    backgroundColor: "#FFFFFF",
    borderRadius: "0.75rem",
    boxShadow:
      "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
    padding: "1.5rem",
  },
  footer: {
    marginTop: "2rem",
    textAlign: "center",
    color: "#6B7280",
    fontSize: "0.875rem",
  },
});

export default function AppLayout({ children }) {
  const { stats } = useTodoFilters();

  return (
    <div {...stylex.props(styles.app)}>
      <div {...stylex.props(styles.container)}>
        {/* Header */}
        <header {...stylex.props(styles.header)}>
          <h1 {...stylex.props(styles.title)}>Todo App - StyleX</h1>
          <p {...stylex.props(styles.subtitle)}>
            Manage your tasks with style and efficiency
          </p>

          {/* Stats Bar */}
          <div {...stylex.props(styles.statsBar)}>
            <div {...stylex.props(styles.statCard)}>
              <span {...stylex.props(styles.statLabel)}>Total</span>
              <div {...stylex.props(styles.statValueBlue)}>{stats.total}</div>
            </div>
            <div {...stylex.props(styles.statCard)}>
              <span {...stylex.props(styles.statLabel)}>Active</span>
              <div {...stylex.props(styles.statValueOrange)}>
                {stats.active}
              </div>
            </div>
            <div {...stylex.props(styles.statCard)}>
              <span {...stylex.props(styles.statLabel)}>Completed</span>
              <div {...stylex.props(styles.statValueGreen)}>
                {stats.completed}
              </div>
            </div>
            <div {...stylex.props(styles.statCard)}>
              <span {...stylex.props(styles.statLabel)}>Progress</span>
              <div {...stylex.props(styles.statValuePurple)}>
                {stats.completionRate}%
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main {...stylex.props(styles.main)}>{children}</main>

        {/* Footer */}
        <footer {...stylex.props(styles.footer)}>
          Built with React, Vite, and StyleX
        </footer>
      </div>
    </div>
  );
}
