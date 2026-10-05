const NAV_TYPES = {
  enter: {
    "nav-forward": "nav-forward",
    "nav-back": "nav-back",
    default: "none",
  },
  exit: {
    "nav-forward": "nav-forward",
    "nav-back": "nav-back",
    default: "none",
  },
  default: "none",
} as const;

export const pageTransition = NAV_TYPES;

export const forwardNav = ["nav-forward"] as const;
export const backNav = ["nav-back"] as const;