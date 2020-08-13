import {Dayjs} from 'dayjs';

export const MONTH = 'MM/YYYY';
export const DAY = 'MM/DD';
export const TIME = 'hh:mm';
export const FULL_TIME = 'MMM DD, YYYY hh:mm';
export const EXACT_DAY = 'ddd';

export const getDaysInMonth = (now: Dayjs) => {
  const year = now.get('year');
  const month = now.get('month');

  const days = new Date(year, month + 1, 0).getDate();

  return [...Array(days)].map((_, i) => i + 1);
};
