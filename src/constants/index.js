export const REWARD_RULES = {
  MIN_AMOUNT_FOR_POINTS: 50,
  MID_AMOUNT_THRESHOLD: 100,
  POINTS_BELOW_100: 1,
  POINTS_ABOVE_100: 2,
};

export const ITEMS_PER_PAGE = 10;

export const API_TIMEOUT = 1000; // 1 second

// Special month values for filter options
export const FILTER_MONTH_OPTIONS = {
  RECENT_3_MONTHS: 0,
  ALL_TRANSACTIONS: -1,
};

export const DEFAULT_FILTER = {
  month: FILTER_MONTH_OPTIONS.RECENT_3_MONTHS, 
  year: new Date().getFullYear(),
};

export const AVAILABLE_YEARS = [2026, 2025, 2024, 2023, 2022, 2021];

export const TRANSACTION_STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  IDLE: 'idle',
};

export const UI_STATES = {
  LOADING: 'loading',
  ERROR: 'error',
  EMPTY: 'empty',
  SUCCESS: 'success',
};
