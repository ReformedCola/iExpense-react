import * as React from 'react';
import {useState} from 'react';
import ReactEcharts from 'echarts-for-react';
import styled from 'styled-components';
import Button from 'components/NewButton';
import {parseMonthRecord, TMonthRecord, TRecord, TRecordType} from 'hooks/useRecords';
import dayjs, {Dayjs} from 'dayjs';
import {getDaysInMonth} from 'lib/date';
import {barChart} from 'lib/chart';

type Props = {
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

const getYData = (days: number[], rawRecordList: TRecord[]) => {
  return days.map(d => {
    const record = rawRecordList.find(r => dayjs(r.date).get('date') === d);
    return record ? record.amount : 0.00;
  });
};

const DayAnalysis: React.FC<Props> = (props) => {
  const {month, monthRecord} = props;

  const [type, setType] = useState<TRecordType>('expense');

  const rawRecordList = monthRecord ? parseMonthRecord(monthRecord).filter(r => r.type === type) : [];

  // compare by days
  const xDayData = getDaysInMonth(month);
  const yDayData = getYData(xDayData, rawRecordList);
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

export default DayAnalysis;
