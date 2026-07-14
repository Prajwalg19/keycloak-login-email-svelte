// Email theme tokens derived directly from src/app.css CSS variables (:root and .dark tokens)
// We use exact hex equivalents of the oklch tokens from app.css so email engines and Keycloak sanitizer
// do not strip out CSS var() functions or unrecognized CSS custom properties inside inline styles.
export const emailTheme = {
  colors: {
    background: "#fafafa", // --background: oklch(1 0 0) light grey wrapper
    foreground: "#0f172a", // --foreground: oklch(0.141 0.005 285.823)
    card: "#ffffff", // --card: oklch(1 0 0)
    cardForeground: "#0f172a", // --card-foreground: oklch(0.141 0.005 285.823)
    primary: "#18181b", // --primary: oklch(0.21 0.006 285.885)
    primaryForeground: "#fafafa", // --primary-foreground: oklch(0.985 0 0)
    muted: "#f4f4f5", // --muted: oklch(0.967 0.001 286.375)
    mutedForeground: "#71717a", // --muted-foreground: oklch(0.552 0.016 285.938)
    border: "#e4e4e7", // --border: oklch(0.92 0.004 286.32)
  },
  radius: {
    container: "8px", // --radius: 0.45rem
    button: "6px",
  },
  fontFamily:
    '"Roboto Variable", Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};
