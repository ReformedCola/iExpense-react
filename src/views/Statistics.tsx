import * as React from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import dayjs, {Dayjs} from 'dayjs';
import {Layout} from 'components/Layout';
import {Drawer} from 'components/Drawer';
import {MonthPanel} from 'components/MonthPanel';
import {Divider} from 'components/Divider';
import {MonthFilterSection} from 'views/Statistics/MonthFilterSection';
import {CategorySection} from 'views/Statistics/CategorySection';
import {DayAnalysis} from 'views/Statistics/DayAnalysis';
import {MonthAnalysis} from 'views/Statistics/MonthAnalysis';
import {useRecords} from 'hooks/useRecords';
import {MONTH} from 'lib/date';

const StyledAnalysis = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const Main = styled.section`
  margin-top: 8px;
  background: white;
  padding: 24px;
`;

const Statistics: React.FC = () => {
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

export {Statistics};
