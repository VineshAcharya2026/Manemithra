/**
 * Mane Mithra design system — Royal Gold, Deep Emerald Teal, Platinum Silver
 * @see ManeMithra brand Guidelines.pdf
 */
export const colors = {
  royalGold: "#C89A3A",
  royalGoldHover: "#B08832",
  deepTeal: "#123C42",
  /** Matches Mane Mithra logo.jpeg background */
  logoTeal: "#123C42",
  tealDark: "#0A2E33",
  platinumSilver: "#D9D9D9",
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
  warningText: "#C89A3A",
  errorBg: "#FDECEA",
  errorText: "#D32F2F",

  goldMuted: "rgba(200, 154, 58, 0.15)",
  goldFocusRing: "rgba(200, 154, 58, 0.2)",
} as const;

export type ThemeColor = keyof typeof colors;
