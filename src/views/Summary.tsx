import * as React from 'react';
import {useState} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import {ALL_CATEGORIES, ALL_TYPE} from 'lib/category';
import useRecords, {RawRecord, RecordType} from 'hooks/useRecords';
import Layout from 'components/Layout';
import styled from 'styled-components';
import Icon from 'components/Icon';
import Divider from 'components/Divider';
import {MONTH} from 'lib/date';
import MonthRecord from 'components/MonthRecord';
import theme from 'theme';
import Sticker from 'components/Sticker';
import Drawer from '../components/Drawer';
import MonthPanel from '../components/MonthPanel';
import CategoryFilter from '../components/CategoryFilter';
import Money from '../components/NewMoney';

const FilterWrapper = styled.section`
  padding: 0 12px;
  background: ${props => props.theme.$success};
  color: ${props => props.theme.$white};
`;

const TypeButton = styled.button`
  margin-top: 26px;
  padding: 8px 16px;
  color: ${props => props.theme.$white};
  background: #3EB1EF;
  border: none;
  outline: none;
  border-radius: 4px;
`;

const MonthButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  color: ${props => props.theme.$white};
  border: none;
  outline: none;
  background: none;
`;

const MonthFilterSection = styled.section`
  padding-top: 8px;
  font-weight: 300;
`;

const RecordList = styled.ul`
  padding: 8px;
  flex-grow: 1;
  overflow: auto;
`;

const Empty = styled.div`
  padding-top: 24px;
  height: 100%;
  text-align: center;
  color: ${props => props.theme.$subText}
`;


const Summary: React.FC = () => {
  const [showMonth, toggleMonth] = useState(false);
  const [showFilter, toggleFilter] = useState(false);
  const [showMoney, toggleMoney] = useState(false);

  const [month, setMonth] = useState(dayjs());
  const [filterId, setFilterId] = useState(ALL_TYPE);
  const [filterType, setFilterType] = useState<RecordType>('expense');

  const {fetchData, addRawRecord, filterRecordList} = useRecords();

  const recordList = filterRecordList(filterId, month, filterType);
  const [firstMonth] = recordList;

  const filter = ALL_CATEGORIES.find(c => c.id === filterId);

  const closeMoney = () => {
    fetchData();
    toggleMoney(false);
  };

  const onAddRecord = (newRawRecord: RawRecord) => {
    addRawRecord(newRawRecord);

    alert('Saved Successfully');
  };

  return (
    <Layout>
      <FilterWrapper>
        <section>
          <TypeButton onClick={() => toggleFilter(true)}>
            <span>{filter ? filter.name : 'All Types'}</span>
            <Divider color="#68C895"/>
            <Icon color="#edf5ed" name="application"/>
          </TypeButton>
        </section>

        <MonthFilterSection>
          <MonthButton onClick={() => toggleMonth(true)}>
            <span style={{marginRight: 4}}>{month.format(MONTH)}</span>
            <Icon color="#9ED8F7" name="dropDown"/>
          </MonthButton>
          <span style={{marginRight: 12}}>
            Total Expense $ {firstMonth ? firstMonth.expenseTotal.toFixed(2) : '0.00'}
          </span>
          <span>
            Total Income $ {firstMonth ? firstMonth.incomeTotal.toFixed(2) : '0.00'}
          </span>
        </MonthFilterSection>
      </FilterWrapper>

      {
        recordList.length !== 0 ?
          <RecordList>
            {
              recordList.map(monthRecord => (
                <MonthRecord key={monthRecord.month} monthRecord={monthRecord}/>
              ))
            }
          </RecordList>
          :
          <Empty>Sorry, no data yet</Empty>
      }

      {/*Bookkeeping*/}
      <Sticker onClick={() => toggleMoney(true)}>
        <Icon name="bookkeeping" size={22} color={theme.$success}/>
      </Sticker>

      {/*Select Month*/}
      {
        showMonth &&
        <Drawer title="Select Month" closeDrawer={() => toggleMonth(false)}>
          <MonthPanel value={month}
                      closeDrawer={() => toggleMonth(false)}
                      onSubmit={(newMonth: Dayjs) => setMonth(newMonth)}/>
        </Drawer>
      }

      {/*Filter Category*/}
      {
        showFilter &&
        <Drawer closeDrawer={() => toggleFilter(false)}>
          <CategoryFilter value={filterId}
                          recordType={filterType}
                          closeDrawer={() => toggleFilter(false)}
                          onSubmit={(id, type) => {
                            setFilterId(id);
                            setFilterType(type);
                          }}/>
        </Drawer>
      }

      {/*Bookkeeping*/}
      {
        showMoney &&
        <Drawer closeDrawer={closeMoney}>
          <Money closeDrawer={closeMoney}
                 onSubmit={onAddRecord}/>
        </Drawer>
      }
    </Layout>
  );
};

export default Summary;