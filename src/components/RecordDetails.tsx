import * as React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {Category} from './Category';
import {Icon} from './Icon';
import {Divider} from './Divider';
import {TRecord} from 'hooks/useRecords';
import {FULL_TIME} from 'lib/date';
import {DEFAULT_EXPENSE_CATEGORIES} from 'lib/category';

type TProps = {
  record: TRecord
  onDelete: (id: string) => void
  onEdit: () => void
}

const StyledRecordDetails = styled.div`
  padding: 16px;
  background: white;
  border-radius: 8px;
  text-align: center;
  h3 {
    margin: 16px 0;
    font-size: 2.4em;
    font-weight: normal;
    letter-spacing: 1px; 
  }
`;

const CategorySection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
`;

const DetailsTable = styled.table`
  margin-bottom: 16px;
  text-align: left;
  border-spacing: 8px;
  td:first-child {
    color: ${props => props.theme.$subText};
    padding-right: 12px;
  }
`;

const ActionSection = styled.section`
  display: flex;
  padding: 16px 0 0;
  border-top: 1px solid #eee;
  > button {
    flex-grow: 1;
    background: none;
    border: none;
  }
`;

const DeleteButton = styled.button`
  color: ${props => props.theme.$danger};
  svg {
    color: ${props => props.theme.$danger}
  }
`;

const RecordDetails: React.FC<TProps> = (props) => {
  const {record, onDelete, onEdit} = props;
  const {id, amount, type, date, note, categoryId} = record;

  const category = DEFAULT_EXPENSE_CATEGORIES.find(c => c.id === categoryId);
  if (!category) return <div>Record does not exist</div>;

  const deleteRecord = () => {
    if (!window.confirm('Record cannot be recovered after deletion, are you sure?')) return;
    onDelete(id);
  };

  return (
    <StyledRecordDetails>
      <CategorySection>
        <Category category={category} recordType={type} size={14}/>
        <span style={{marginLeft: 8}}>{category.name}</span>
      </CategorySection>
      <h3>
        {type === 'expense' ? '-' : '+'}
        {amount}
      </h3>
      <DetailsTable>
        <tbody>
        <tr>
          <td>Record Time</td>
          <td>{dayjs(date).format(FULL_TIME)}</td>
        </tr>
        <tr>
          <td>Note</td>
          <td>{note}</td>
        </tr>
        </tbody>
      </DetailsTable>
      <ActionSection>
        <DeleteButton onClick={deleteRecord}>
          <Icon name="delete"/>
          <span style={{marginLeft: 8}}>Delete</span>
        </DeleteButton>
        <Divider gap={0}/>
        <button onClick={onEdit}>
          <Icon name="note"/>
          <span style={{marginLeft: 8}}>Edit</span>
        </button>
      </ActionSection>
    </StyledRecordDetails>
  );
};

export {RecordDetails};