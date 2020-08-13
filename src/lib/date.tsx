import {Dayjs} from 'dayjs';

export const MONTH = 'MM/YYYY';
export const DAY = 'MM/DD';
export const TIME = 'HH:mm';
export const FULL_TIME = 'MMM DD, YYYY HH:mm';
export const EXACT_DAY = 'dddd';

export const getDaysInMonth = (now: Dayjs) => {
  const year = now.get('year');
  const month = now.get('month');

  const days = new Date(year, month + 1, 0).getDate();

  return [...Array(days)].map((_, i) => i + 1);
};
