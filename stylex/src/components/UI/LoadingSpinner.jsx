import * as stylex from "@stylexjs/stylex";

const spin = {
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
};

const styles = stylex.create({
  root: {
    animationName: spin,
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  sizeSm: { width: "1rem", height: "1rem" },
  sizeMd: { width: "1.5rem", height: "1.5rem" },
  sizeLg: { width: "2rem", height: "2rem" },
  sizeXl: { width: "3rem", height: "3rem" },
  svg: { width: "100%", height: "100%" },
  circle25: { opacity: 0.25 },
  path75: { opacity: 0.75 },
});

export default function LoadingSpinner({ size = "md", className = "" }) {
  const sizeStyle =
    size === "sm"
      ? styles.sizeSm
      : size === "lg"
      ? styles.sizeLg
      : size === "xl"
      ? styles.sizeXl
      : styles.sizeMd;
  return (
    <div {...stylex.props(styles.root, sizeStyle)} className={className}>
      <svg {...stylex.props(styles.svg)} viewBox="0 0 24 24">
        <circle
          {...stylex.props(styles.circle25)}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          {...stylex.props(styles.path75)}
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}
