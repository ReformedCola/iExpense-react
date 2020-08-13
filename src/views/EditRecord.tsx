import * as React from 'react';
import {useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import {Icon} from 'components/Icon';
import {RecordDetails} from 'components/RecordDetails';
import {Drawer} from 'components/Drawer';
import {Money} from 'components/Money';
import {useRecords, TRecord} from 'hooks/useRecords';

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
  const {recordList, deleteRecord, editRecord} = useRecords();
  const [showMoney, toggleMoney] = useState(false);

  const record = recordList.find(r => r.id === id);
  if (!record) return <div>Record does not exist</div>;

  const onDelete = (id: string) => {
    deleteRecord(id);
    push('/');
    alert('Deleted Successfully');
  };

  const onEdit = (record: TRecord) => {
    editRecord(record);
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
                       record={record}/>
      </Main>
      {
        showMoney &&
        <Drawer closeDrawer={() => toggleMoney(false)}>
          <Money closeDrawer={() => toggleMoney(false)}
                 onSubmit={onEdit}
                 value={record}/>
        </Drawer>
      }
    </div>
  );
};

export {EditRecord};