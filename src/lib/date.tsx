import {Dayjs} from 'dayjs';

export const MONTH = 'MMM YYYY';
export const DAY = 'MMM DD';
export const TIME = 'hh:mm';
export const FULL_TIME = 'MMM DD YYYY hh:mm';

export const getDaysInMonth = (now: Dayjs) => {
  const year = now.get('year');
  const month = now.get('month');

  const days = new Date(year, month + 1, 0).getDate();

  return [...Array(days)].map((_, i) => i + 1);
};
