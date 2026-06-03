/**
 * Manemithra design system — Black, Gold, White, Navy Blue
 * Single source of truth for all color values.
 */
export const colors = {
  primaryGold: "#FCA311",
  primaryGoldHover: "#e69400",
  primaryNavy: "#14213D",
  black: "#000000",
  white: "#FFFFFF",
  grayLight: "#E5E5E5",
  surface: "#F5F5F5",
  body: "#333333",
  muted: "#666666",
  rowHover: "#F8F9FA",

  /** Semantic */
  successBg: "#E8F5E9",
  successText: "#2E7D32",
  warningBg: "#FFF8E1",
  warningText: "#FCA311",
  errorBg: "#FDECEA",
  errorText: "#D32F2F",

  goldMuted: "rgba(252, 163, 17, 0.15)",
  goldFocusRing: "rgba(252, 163, 17, 0.15)",
  navyDark: "#0d1528",
} as const;

export type ThemeColor = keyof typeof colors;
