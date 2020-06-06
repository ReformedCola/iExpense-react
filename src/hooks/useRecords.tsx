import {useEffect, useState} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import {DAY, MONTH} from 'lib/date';
import {ALL_TYPE} from 'lib/category';

export type RecordType = 'expense' | 'income'

export type RawRecord = {
  id: string
  date: string
  categoryId: string
  amount: number
  note: string
  type: RecordType
}

export type Record = {
  incomeTotal: number
  expenseTotal: number
}

export type TDayRecord = Record & {
  day: string
  recordList: RawRecord[]
}

export type TMonthRecord = Record & {
  month: string
  recordList: TDayRecord[]
}

export const DEFAULT_RECORDS: RawRecord[] = [
  {
    id: '1',
    date: dayjs('2020-03-01').toISOString(),
    categoryId: '4',
    amount: 300,
    note: 'Dinner',
    type: 'expense'
  },
  {
    id: '2',
    date: dayjs('2020-04-02').toISOString(),
    categoryId: '9',
    amount: 400,
    note: 'Wage',
    type: 'income'
  },
  {
    id: '3',
    date: dayjs('2020-05-03').toISOString(),
    categoryId: '1',
    amount: 200,
    note: 'Shopping',
    type: 'expense'
  },
  {
    id: '4',
    date: dayjs('2020-06-04').toISOString(),
    categoryId: '5',
    amount: 500,
    note: 'Korea',
    type: 'expense'
  }
];

// append single record
export const appendRecord = (prevRecordList: TMonthRecord[], rawRecord: RawRecord) => {
  const month = dayjs(rawRecord.date).format(MONTH);
  const day = dayjs(rawRecord.date).format(DAY);

  // find month
  let monthRecord = prevRecordList.find((m: TMonthRecord) => m.month === month);
  if (!monthRecord) {
    monthRecord = {month, incomeTotal: 0, expenseTotal: 0, recordList: []};
    prevRecordList.push(monthRecord);
  }

  // find day
  let dayRecord = monthRecord.recordList.find((d: TDayRecord) => d.day === day);
  if (!dayRecord) {
    dayRecord = {day, incomeTotal: 0, expenseTotal: 0, recordList: []};
    monthRecord.recordList.push(dayRecord);
  }

  // insert record
  dayRecord.recordList.push(rawRecord);

  // update total
  updateTotal(monthRecord, dayRecord, rawRecord);
};

const updateTotal = (monthRecord: TMonthRecord, dayRecord: TDayRecord, rawRecord: RawRecord) => {
  const {amount, type} = rawRecord;

  if (type === 'expense') {
    dayRecord.expenseTotal += amount;
    monthRecord.expenseTotal += amount;
  } else {
    dayRecord.incomeTotal += amount;
    monthRecord.incomeTotal += amount;
  }
};

// append multiple records
export const bulkAppendRecords = (prevRecordList: TMonthRecord[], rawRecordList: RawRecord[]) => {
  let recordList: TMonthRecord[] = JSON.parse(JSON.stringify(prevRecordList));

  rawRecordList.forEach((rawRecord: RawRecord) => {
    appendRecord(recordList, rawRecord);
  });

  return recordList;
};

export const parseMonthRecord = (monthRecord: TMonthRecord) => {
  let rawRecordList: RawRecord[] = [];
  monthRecord.recordList.forEach(m =>
    m.recordList.forEach((d =>
      rawRecordList.push(d))
    )
  );
  return rawRecordList;
};

const useRecords = () => {
  const ITEM_NAME = 'rawRecordList';

  const [rawRecordList, setRawRecordList] = useState<RawRecord[]>([]);
  const [recordList, setRecordList] = useState<TMonthRecord[]>([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    const rawString = window.localStorage.getItem(ITEM_NAME);

    const rawRecordList = !rawString ? DEFAULT_RECORDS : JSON.parse(rawString);

    setRawRecordList(rawRecordList);
    setRecordList(bulkAppendRecords([], rawRecordList));
  };

  const getMonthRecord = (month: string) => {
    return recordList.find(m => m.month === month);
  };

  const addRawRecord = (rawRecord: RawRecord) => {
    const newRawRecordList = [rawRecord, ...rawRecordList];

    window.localStorage.setItem(ITEM_NAME, JSON.stringify(newRawRecordList));

    setRawRecordList(newRawRecordList);
    setRecordList(bulkAppendRecords([], newRawRecordList));
  };

  const filterRecordList = (categoryId: string, month: Dayjs, type: RecordType) => {
    const filtered = rawRecordList.filter(r => {
      if (categoryId === ALL_TYPE) return true; // for all types
      return r.type === type && r.categoryId === categoryId; // for corresponding type and category
    }).filter(r => {
      if (month.isSame(dayjs(), 'month')) return true; // for month
      return dayjs(r.date).isSame(month, 'month'); // for corresponding month
    });

    return bulkAppendRecords([], filtered);
  };

  const deleteRecord = (id: string) => {
    const newRawRecordList = rawRecordList.filter(r => r.id !== id);

    // save
    window.localStorage.setItem(ITEM_NAME, JSON.stringify(newRawRecordList));

    setRawRecordList(newRawRecordList);
    setRecordList(bulkAppendRecords([], newRawRecordList));
  };

  const editRecord = (rawRecord: RawRecord) => {
    const copy: RawRecord[] = JSON.parse(JSON.stringify(rawRecordList));
    let index = -1;

    // find record
    copy.some((r, i) => {
      if (r.id === rawRecord.id) {
        index = i;
        return true;
      }
      return false;
    });

    const newRawRecordList = [
      ...copy.slice(0, index),
      {...rawRecord},
      ...copy.slice(index + 1)
    ];

    window.localStorage.setItem(ITEM_NAME, JSON.stringify(newRawRecordList));

    setRawRecordList(newRawRecordList);
    setRecordList(bulkAppendRecords([], newRawRecordList));
  };

  return {
    rawRecordList,
    recordList,
    setRawRecordList,
    appendRecord,
    bulkAppendRecords,
    addRawRecord,
    getMonthRecord,
    fetchData,
    filterRecordList,
    deleteRecord,
    editRecord
  };

};

export default useRecords;