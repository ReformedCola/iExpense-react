import {useEffect, useState} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import {DAY, EXACT_DAY, MONTH} from 'lib/date';
import {ALL_TYPE} from 'lib/category';

export type TRecordType = 'expense' | 'income'

export type TRecord = {
  id: string
  date: string
  categoryId: string
  amount: number
  note: string
  type: TRecordType
}

export type TFilteredRecord = {
  incomeTotal: number
  expenseTotal: number
}

export type TDayRecord = TFilteredRecord & {
  day: string
  exactDay: string
  recordList: TRecord[]
}

export type TMonthRecord = TFilteredRecord & {
  month: string
  recordList: TDayRecord[]
}

export const DEFAULT_RECORDS: TRecord[] = [
  {
    id: '1',
    date: dayjs('2020-06-01 20:00').toISOString(),
    categoryId: '4',
    amount: 300,
    note: 'Dinner',
    type: 'expense'
  },
  {
    id: '2',
    date: dayjs('2020-05-02 12:00').toISOString(),
    categoryId: '9',
    amount: 400,
    note: 'Wage',
    type: 'income'
  },
  {
    id: '3',
    date: dayjs('2020-04-03 15:00').toISOString(),
    categoryId: '1',
    amount: 200,
    note: 'Shopping',
    type: 'expense'
  },
  {
    id: '4',
    date: dayjs('2020-03-04 8:00').toISOString(),
    categoryId: '5',
    amount: 500,
    note: 'Korea',
    type: 'expense'
  },
];

// append single record
export const appendRecord = (prevRecordList: TMonthRecord[], record: TRecord) => {
  const month = dayjs(record.date).format(MONTH);
  const day = dayjs(record.date).format(DAY);
  const exactDay = dayjs(record.date).format(EXACT_DAY);

  // find month
  let monthRecord = prevRecordList.find((m: TMonthRecord) => m.month === month);
  if (!monthRecord) {
    monthRecord = {month, incomeTotal: 0, expenseTotal: 0, recordList: []};
    prevRecordList.push(monthRecord);
  }

  // find day
  let dayRecord = monthRecord.recordList.find((d: TDayRecord) => d.day === day);
  if (!dayRecord) {
    dayRecord = {day, exactDay, incomeTotal: 0, expenseTotal: 0, recordList: []};
    monthRecord.recordList.push(dayRecord);
  }

  // insert record
  dayRecord.recordList.push(record);

  // update total
  updateTotal(monthRecord, dayRecord, record);
};

const updateTotal = (monthRecord: TMonthRecord, dayRecord: TDayRecord, record: TRecord) => {
  const {amount, type} = record;
  if (type === 'expense') {
    dayRecord.expenseTotal += amount;
    monthRecord.expenseTotal += amount;
  } else {
    dayRecord.incomeTotal += amount;
    monthRecord.incomeTotal += amount;
  }
};

// append multiple records
export const bulkAppendRecords = (prevRecordList: TMonthRecord[], newRecordList: TRecord[]) => {
  let recordList: TMonthRecord[] = JSON.parse(JSON.stringify(prevRecordList));
  newRecordList.forEach((record: TRecord) => {
    appendRecord(recordList, record);
  });
  return recordList;
};

export const parseMonthRecord = (monthRecord: TMonthRecord) => {
  let records: TRecord[] = [];
  monthRecord.recordList.forEach(m =>
    m.recordList.forEach((d =>
      records.push(d))
    )
  );
  return records;
};

const useRecords = () => {
  const ITEM_NAME = 'recordList';

  const [recordList, setRecordList] = useState<TRecord[]>([]);
  const [filteredRecordList, setFilteredRecordList] = useState<TMonthRecord[]>([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    const ITEM = window.localStorage.getItem(ITEM_NAME);
    const records = ITEM ? JSON.parse(ITEM) : DEFAULT_RECORDS;
    setRecordList(records);
    setFilteredRecordList(bulkAppendRecords([], records));
  };

  const getMonthRecord = (month: string) => {
    return filteredRecordList.find(record => record.month === month);
  };

  const addRecord = (record: TRecord) => {
    const newRecords = [record, ...recordList];
    window.localStorage.setItem(ITEM_NAME, JSON.stringify(newRecords));
    setRecordList(newRecords);
    setFilteredRecordList(bulkAppendRecords([], newRecords));
  };

  const filterRecordList = (filterId: string, month: Dayjs, type: TRecordType) => {
    const filtered = recordList.filter(record => {
      if (filterId === ALL_TYPE) return true; // for all types
      return record.type === type && record.categoryId === filterId; // for corresponding type and category
    }).filter(record => {
      if (month.isSame(dayjs(), 'month')) return true; // for month
      return dayjs(record.date).isSame(month, 'month'); // for corresponding month
    });
    return bulkAppendRecords([], filtered);
  };

  const deleteRecord = (id: string) => {
    const newRecords = recordList.filter(record => record.id !== id);
    // save
    window.localStorage.setItem(ITEM_NAME, JSON.stringify(newRecords));
    setRecordList(newRecords);
    setFilteredRecordList(bulkAppendRecords([], newRecords));
  };

  const editRecord = (record: TRecord) => {
    const clone: TRecord[] = JSON.parse(JSON.stringify(recordList));
    let index = -1;
    // find record
    clone.some((r, i) => {
      if (r.id === record.id) {
        index = i;
        return true;
      }
      return false;
    });
    const newRecords = [
      ...clone.slice(0, index),
      {...record},
      ...clone.slice(index + 1)
    ];
    window.localStorage.setItem(ITEM_NAME, JSON.stringify(newRecords));
    setRecordList(newRecords);
    setFilteredRecordList(bulkAppendRecords([], newRecords));
  };

  return {
    recordList,
    filteredRecordList,
    setRecordList,
    appendRecord,
    bulkAppendRecords,
    addRecord,
    getMonthRecord,
    fetchData,
    filterRecordList,
    deleteRecord,
    editRecord,
  };
};

export {useRecords};