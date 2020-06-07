import * as React from 'react';
import Layout from 'components/Layout';
import styled from 'styled-components';
import MonthFilterSection from 'views/Analysis/MonthFilterSection';
import Drawer from 'components/Drawer';
import MonthPanel from 'components/MonthPanel';
import dayjs, {Dayjs} from 'dayjs';
import {useState} from 'react';
import useRecords from 'hooks/useRecords';
import {MONTH} from 'lib/date';
import CategorySection from 'views/Analysis/CategorySection';
import Divider from 'components/Divider';
import DayAnalysis from 'views/Analysis/DayAnalysis';
import MonthAnalysis from 'views/Analysis/MonthAnalysis';

const StyledAnalysis = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const Main = styled.section`
  margin-top: 8px;
  background: white;
  padding: 24px;
`;

const Analysis: React.FC = () => {
  const [showMonth, toggleMonth] = useState(false);
  const [month, setMonth] = useState(dayjs());

  const {getMonthRecord} = useRecords();

  // selected month record
  const selectedRecordList = getMonthRecord(month.format(MONTH));

  return (
    <Layout>
      <StyledAnalysis>
        <MonthFilterSection monthRecord={selectedRecordList}
                            month={month}
                            showMonth={() => toggleMonth(true)}/>
        <Main>
          <CategorySection monthRecord={selectedRecordList}/>

          <Divider direction="horizontal" gap={24}/>

          <DayAnalysis month={month}
                       monthRecord={selectedRecordList}
          />

          <Divider direction="horizontal" gap={24}/>

          <MonthAnalysis getMonthRecord={getMonthRecord}/>
        </Main>
      </StyledAnalysis>


      {/*choose month*/}
      {
        showMonth &&
        <Drawer title="Select Month" closeDrawer={() => toggleMonth(false)}>
          <MonthPanel value={month}
                      closeDrawer={() => toggleMonth(false)}
                      onSubmit={(newMonth: Dayjs) => setMonth(newMonth)}/>
        </Drawer>
      }
    </Layout>
  );
};

export default Analysis;
