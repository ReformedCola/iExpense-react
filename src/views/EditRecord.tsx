import * as React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Icon from '../components/NewIcon';
import styled from 'styled-components';
import RecordDetails from '../components/RecordDetails';
import useRecords, {RawRecord} from '../hooks/useRecords';
import {useState} from 'react';
import Drawer from '../components/Drawer';
import Money from '../components/NewMoney';

type TParams = {
  id: string
}

const Header = styled.header`
  padding: 24px 12px;
`;

const Main = styled.section`
  padding: 0 12px;
`;

const EditRecord: React.FC = () => {
  const {goBack, push} = useHistory();
  const {id} = useParams<TParams>();
  const {rawRecordList, deleteRecord, editRecord} = useRecords();
  const [showMoney, toggleMoney] = useState(false);

  const rawRecord = rawRecordList.find(r => r.id === id);
  if (!rawRecord) return <div>Record does not exist</div>;

  const onDelete = (id: string) => {
    deleteRecord(id);
    push('/');
    alert('Deleted Successfully');
  };

  const onEdit = (rawRecord: RawRecord) => {
    editRecord(rawRecord);
    alert('Edited Successfully');
  };

  return (
    <div>
      <Header>
        <Icon name="left" onClick={goBack} size={24}/>
      </Header>
      <Main>
        <RecordDetails onDelete={onDelete}
                       onEdit={() => toggleMoney(true)}
                       rawRecord={rawRecord}/>
      </Main>
      {
        showMoney &&
        <Drawer closeDrawer={() => toggleMoney(false)}>
          <Money closeDrawer={() => toggleMoney(false)}
                 onSubmit={onEdit}
                 value={rawRecord}/>
        </Drawer>
      }
    </div>
  );
};

export default EditRecord;