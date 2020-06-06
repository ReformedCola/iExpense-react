import * as React from 'react';
import DayRecord from './DayRecord';
import {TMonthRecord} from 'hooks/useRecords';
import styled from 'styled-components';
import Divider from './Divider';
import dayjs from 'dayjs';
import {MONTH} from '../lib/date';

type Props = {
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

const MonthRecord: React.FC<Props> = (props) => {
  const {month, recordList, incomeTotal, expenseTotal} = props.monthRecord;

  const curtMonth = dayjs().format(MONTH);

  return (
    <RecordList>
      {
        curtMonth !== month &&  // show records that are excluded from current month
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

export default MonthRecord;
