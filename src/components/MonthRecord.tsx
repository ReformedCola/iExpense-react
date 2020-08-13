import * as React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {DayRecord} from './DayRecord';
import {Divider} from './Divider';
import {TMonthRecord} from 'hooks/useRecords';
import {MONTH} from 'lib/date';

type TProps = {
  monthRecord: TMonthRecord
}

const Header = styled.div`
  padding: 8px 18px;
  span {
    font-size: ${props => props.theme.$normalTextSize};
    color: ${props => props.theme.$subText}
  }
`;

const RecordList = styled.li``;

const MonthRecord: React.FC<TProps> = (props) => {
  const {month, recordList, incomeTotal, expenseTotal} = props.monthRecord;

  const currentMonth = dayjs().format(MONTH);

  return (
    <RecordList>
      {
        currentMonth !== month &&  // show records that are excluded from current month
        <Header>
          <span>{month}</span>
          <Divider gap={8}/>
          <span style={{marginRight: 12}}>
            Total Expense $ {expenseTotal.toFixed(2)}
          </span>
          <span>
            Total Income $ {incomeTotal.toFixed(2)}
          </span>
        </Header>
      }
      <ul>
        {
          recordList && recordList.map(dayRecord => (
            <DayRecord key={dayRecord.day} dayRecord={dayRecord}/>
          ))
        }
      </ul>
    </RecordList>
  );
};

export {MonthRecord};
