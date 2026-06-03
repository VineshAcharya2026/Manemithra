import { colors } from "./colors";

export const theme = {
  colors,

  typography: {
    heading: colors.primaryNavy,
    body: colors.body,
    muted: colors.muted,
    onDark: colors.white,
  },

  layout: {
    sidebar: colors.primaryNavy,
    navbar: colors.white,
    mainBackground: colors.surface,
    footer: colors.primaryNavy,
  },

  buttons: {
    primary: {
      bg: colors.primaryGold,
      bgHover: colors.primaryGoldHover,
      text: colors.white,
    },
    secondary: {
      bg: colors.primaryNavy,
      bgHover: colors.navyDark,
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
    focusBorder: colors.primaryGold,
    focusRing: colors.goldFocusRing,
  },

  table: {
    headerBg: colors.primaryNavy,
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
    color: colors.primaryGold,
  },

  badges: {
    success: { bg: colors.successBg, text: colors.successText },
    warning: { bg: colors.warningBg, text: colors.warningText },
    error: { bg: colors.errorBg, text: colors.errorText },
  },

  sidebar: {
    default: colors.grayLight,
    activeBg: colors.primaryGold,
    activeText: colors.white,
    hoverBg: colors.goldMuted,
  },
} as const;

export default theme;
