import { useTodoFilters } from "../../hooks/useTodoFilters";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  card: { backgroundColor: "#F9FAFB", borderRadius: "0.5rem", padding: "1rem" },
  layout: {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
    "@media (min-width: 1024px)": {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      columnGap: "1rem",
      rowGap: 0,
    },
  },
  searchWrap: { flex: 1, maxWidth: "24rem" },
  relative: { position: "relative" },
  searchInput: {
    width: "100%",
    paddingLeft: "2.5rem",
    paddingRight: "1rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D1D5DB",
    borderRadius: "0.5rem",
    outline: "none",
    transition: "box-shadow 150ms, border-color 150ms",
    ":focus": {
      boxShadow: "0 0 0 2px rgba(59,130,246,0.5)",
      borderColor: "transparent",
    },
  },
  searchIcon: {
    position: "absolute",
    insetBlock: 0,
    left: "0.75rem",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
    color: "#9CA3AF",
  },
  filtersBar: {
    display: "flex",
    columnGap: "0.25rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "0.5rem",
    padding: "0.25rem",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
  },
  filterBtn: {
    paddingInline: "1rem",
    paddingBlock: "0.5rem",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    transition: "background-color 150ms, color 150ms",
  },
  filterBtnActive: { backgroundColor: "#2563EB", color: "#FFFFFF" },
  filterBtnInactive: {
    color: "#4B5563",
    ":hover": { color: "#1F2937", backgroundColor: "#F3F4F6" },
  },
  select: {
    width: "100%",
    paddingInline: "0.75rem",
    paddingBlock: "0.5rem",
    border: "1px solid #D1D5DB",
    borderRadius: "0.5rem",
    outline: "none",
    backgroundColor: "#FFFFFF",
    ":focus": {
      boxShadow: "0 0 0 2px rgba(59,130,246,0.5)",
      borderColor: "transparent",
    },
  },
  tags: {
    marginTop: "0.75rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  chipBlue: {
    display: "inline-flex",
    alignItems: "center",
    paddingInline: "0.75rem",
    paddingBlock: "0.25rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: 600,
    backgroundColor: "#DBEAFE",
    color: "#1E40AF",
  },
  chipGreen: {
    display: "inline-flex",
    alignItems: "center",
    paddingInline: "0.75rem",
    paddingBlock: "0.25rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: 600,
    backgroundColor: "#D1FAE5",
    color: "#065F46",
  },
  chipPurple: {
    display: "inline-flex",
    alignItems: "center",
    paddingInline: "0.75rem",
    paddingBlock: "0.25rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: 600,
    backgroundColor: "#EDE9FE",
    color: "#5B21B6",
  },
  chipCloseBlue: {
    marginLeft: "0.5rem",
    color: "#2563EB",
    ":hover": { color: "#1E3A8A" },
  },
  chipCloseGreen: {
    marginLeft: "0.5rem",
    color: "#16A34A",
    ":hover": { color: "#065F46" },
  },
  chipClosePurple: {
    marginLeft: "0.5rem",
    color: "#7C3AED",
    ":hover": { color: "#4C1D95" },
  },
});

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
    { key: "all", label: "All", count: null },
    { key: "active", label: "Active", count: null },
    { key: "completed", label: "Completed", count: null },
  ];

  return (
    <div {...stylex.props(styles.card)}>
      <div {...stylex.props(styles.layout)}>
        {/* Search Input */}
        <div {...stylex.props(styles.searchWrap)}>
          <div {...stylex.props(styles.relative)}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search todos..."
              {...stylex.props(styles.searchInput)}
            />
            <div {...stylex.props(styles.searchIcon)}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div {...stylex.props(styles.filtersBar)}>
          {filterButtons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setFilter(btn.key)}
              {...stylex.props(
                styles.filterBtn,
                filter === btn.key
                  ? styles.filterBtnActive
                  : styles.filterBtnInactive
              )}
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
            {...stylex.props(styles.select)}
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
      {(searchTerm || selectedCategory !== "all" || filter !== "all") && (
        <div {...stylex.props(styles.tags)}>
          {searchTerm && (
            <span {...stylex.props(styles.chipBlue)}>
              Search: "{searchTerm}"
              <button
                onClick={() => setSearchTerm("")}
                {...stylex.props(styles.chipCloseBlue)}
              >
                ×
              </button>
            </span>
          )}
          {selectedCategory !== "all" && (
            <span {...stylex.props(styles.chipGreen)}>
              Category: {selectedCategory}
              <button
                onClick={() => setSelectedCategory("all")}
                {...stylex.props(styles.chipCloseGreen)}
              >
                ×
              </button>
            </span>
          )}
          {filter !== "all" && (
            <span {...stylex.props(styles.chipPurple)}>
              Status: {filter}
              <button
                onClick={() => setFilter("all")}
                {...stylex.props(styles.chipClosePurple)}
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
