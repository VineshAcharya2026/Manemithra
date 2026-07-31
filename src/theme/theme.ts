import { colors } from "./colors";

export const theme = {
  colors,

  typography: {
    heading: colors.deepTeal,
    body: colors.body,
    muted: colors.muted,
    onDark: colors.white,
  },

  layout: {
    sidebar: colors.deepTeal,
    navbar: colors.white,
    mainBackground: colors.surface,
    footer: colors.deepTeal,
  },

  buttons: {
    primary: {
      bg: colors.royalGold,
      bgHover: colors.royalGoldHover,
      text: colors.white,
    },
    secondary: {
      bg: colors.deepTeal,
      bgHover: colors.tealDark,
      text: colors.white,
    },
    danger: {
      bg: colors.black,
      bgHover: "#1a1a1a",
      text: colors.white,
    },
  },

  forms: {
    border: colors.grayLight,
    background: colors.white,
    focusBorder: colors.royalGold,
    focusRing: colors.goldFocusRing,
  },

  table: {
    headerBg: colors.deepTeal,
    headerText: colors.white,
    rowBg: colors.white,
    rowHover: colors.rowHover,
  },

  card: {
    background: colors.white,
    borderRadius: "16px",
    padding: "24px",
    shadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },

  metricIcon: {
    background: colors.goldMuted,
    color: colors.royalGold,
  },

  badges: {
    success: { bg: colors.successBg, text: colors.successText },
    warning: { bg: colors.warningBg, text: colors.warningText },
    error: { bg: colors.errorBg, text: colors.errorText },
  },

  sidebar: {
    default: colors.grayLight,
    activeBg: colors.royalGold,
    activeText: colors.white,
    hoverBg: colors.goldMuted,
  },
} as const;

export default theme;
