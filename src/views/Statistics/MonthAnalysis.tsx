import * as React from 'react';
import {useState} from 'react';
import ReactEcharts from 'echarts-for-react';
import styled from 'styled-components';
import dayjs, {Dayjs} from 'dayjs';
import {getPrevMonths} from 'components/MonthPanel';
import {Button} from 'components/Button';
import {TMonthRecord, TRecordType} from 'hooks/useRecords';
import {barChart} from 'lib/chart';
import {MONTH} from 'lib/date';

type TProps = {
  getMonthRecord: (month: string) => TMonthRecord | undefined
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

const getYData = (months: Dayjs[], getMonthRecord: Function, type: String) => {
  return months.map(m => {
    const monthRecord = getMonthRecord(m.format(MONTH));

    // 0 if none
    if (!monthRecord) return 0;

    return type === 'expense' ? monthRecord.expenseTotal : monthRecord.incomeTotal;
  });
};


const MonthAnalysis: React.FC<TProps> = (props) => {
  const {getMonthRecord} = props;

  const [type, setType] = useState<TRecordType>('expense');

  // compare by months
  const months = getPrevMonths();
  const xData = months.map(m => dayjs(m).format('MMM'));
  const yData = getYData(months, getMonthRecord, type);

  const monthChartOptions = barChart(xData, yData, type);

  return (
    <div>
      <Header>
        <span>Months</span>
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
        <ReactEcharts option={monthChartOptions}/>
      </Main>
    </div>
  );
};

export {MonthAnalysis};