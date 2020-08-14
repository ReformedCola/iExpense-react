import * as React from 'react';
import {useState} from 'react';
import ReactEcharts from 'echarts-for-react';
import styled from 'styled-components';
import dayjs, {Dayjs} from 'dayjs';
import {Button} from 'components/Button';
import {parseMonthRecord, TMonthRecord, TRecord, TRecordType} from 'hooks/useRecords';
import {getDaysInMonth} from 'lib/date';
import {barChart} from 'lib/chart';

type TProps = {
  month: Dayjs
  monthRecord?: TMonthRecord
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > span {
    font-size: ${props => props.theme.$mainTextSize};
  }
`;

const Main = styled.div`
  margin: 0 -24px;
`;

const getYData = (days: number[], recordList: TRecord[]) => {
  return days.map(d => {
    let total = 0;
    recordList.filter(record => dayjs(record.date).get('date') === d).forEach(r => {
      total = r ? total += r.amount : 0.00;
    });
    return total;
  });
};

const DayAnalysis: React.FC<TProps> = (props) => {
  const {month, monthRecord} = props;

  const [type, setType] = useState<TRecordType>('expense');

  const recordList = monthRecord ? parseMonthRecord(monthRecord).filter(r => r.type === type) : [];

  // compare by days
  const xDayData = getDaysInMonth(month);
  const yDayData = getYData(xDayData, recordList);
  const dayChartOptions = barChart(xDayData, yDayData, type);

  return (
    <section>
      <Header>
        <span>Days</span>

        <span>
          <Button recordType={type === 'expense' ? 'success' : 'none'}
                  size="small"
                  onClick={() => setType('expense')}>
            Expense
          </Button>
          <Button recordType={type === 'income' ? 'warning' : 'none'}
                  size="small"
                  onClick={() => setType('income')}>
            Income
          </Button>
        </span>
      </Header>

      <Main>
        <ReactEcharts option={dayChartOptions}/>
      </Main>
    </section>
  );
};

export {DayAnalysis};
