export const REWARD_RULES = {
  MIN_AMOUNT_FOR_POINTS: 50,
  MID_AMOUNT_THRESHOLD: 100,
  POINTS_BELOW_100: 1,
  POINTS_ABOVE_100: 2,
};

export const ITEMS_PER_PAGE = 10;

export const API_TIMEOUT = 1000; // 1 second

export const DEFAULT_FILTER = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
};

export const AVAILABLE_YEARS = [2021, 2022, 2023, 2024, 2025];

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
