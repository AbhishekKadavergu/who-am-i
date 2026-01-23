/**
 * UI Constants - centralized time delays, sizes, and z-indexes
 */

export const UI_CONSTANTS = {
  // Timing delays
  DEBOUNCE_MS: 300,
  CAROUSEL_AUTO_PLAY_MS: 6000,
  TOAST_DURATION_MS: 5000,
  TRANSITION_DURATION_MS: 200,

  // Z-indexes
  MODAL_Z_INDEX: 50,
  TOAST_Z_INDEX: 100,
  DROPDOWN_Z_INDEX: 40,

  // Sizes
  ICON_SIZE_SM: 16,
  ICON_SIZE_MD: 28,
  ICON_SIZE_LG: 32,
  AVATAR_SIZE: 128,
} as const;

export default UI_CONSTANTS;
