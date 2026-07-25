// Manas Advertising — Design Tokens
// Central source of truth for all visual design decisions.

export const colors = {
  primary: {
    DEFAULT: "#0B1B33", // deep indigo-navy — trust, premium
    50: "#EAF0FA",
    100: "#C7D6EE",
    500: "#0B1B33",
    900: "#050D1A",
  },
  accent: {
    DEFAULT: "#E8A93B", // warm amber-gold — Indian craft, energy
    500: "#E8A93B",
    600: "#C98A1F",
  },
  neutral: {
    50: "#F8F9FB",
    100: "#EEF0F4",
    300: "#C9CDD6",
    500: "#7A8093",
    700: "#3C4152",
    900: "#14161F",
  },
  success: "#2E9E6B",
  warning: "#E8A93B",
  error: "#D3453A",
};

export const typography = {
  fontDisplay: "var(--font-display)", // headings
  fontBody: "var(--font-body)", // paragraphs
  scale: {
    h1: "clamp(2.75rem, 5vw, 5rem)",
    h2: "clamp(2rem, 3.5vw, 3.25rem)",
    h3: "clamp(1.5rem, 2.5vw, 2.25rem)",
    body: "1.05rem",
    small: "0.875rem",
  },
};

export const spacing = {
  section: "clamp(4rem, 8vw, 8rem)",
  container: "clamp(1.25rem, 5vw, 4rem)",
};

export const radius = {
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  pill: "999px",
};

export const shadow = {
  card: "0 8px 30px rgba(11,27,51,0.08)",
  cardHover: "0 20px 45px rgba(11,27,51,0.16)",
};

export const breakpoints = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1536,
};

export const motion = {
  durationFast: 0.2,
  durationBase: 0.4,
  durationSlow: 0.8,
  ease: [0.16, 1, 0.3, 1], // premium "expo-out" easing
};
