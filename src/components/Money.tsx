import * as React from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import {Button} from './Button';
import {NumberPad} from './NumberPad';
import {Category} from './Category';
import {TRecord, TRecordType} from 'hooks/useRecords';
import {DEFAULT_EXPENSE_CATEGORIES, DEFAULT_INCOME_CATEGORIES} from 'lib/category';

type TProps = {
  value?: TRecord
  closeDrawer: () => void
  onSubmit: (newRecord: TRecord) => void
}

const TypeSection = styled.section`
  padding: 16px;
  display: flex;
  align-items: center;
`;

const AmountSection = styled.section`
  display: flex;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #eee;
  > span {
    font-size: 2.5em;
  }
  > div {
    padding-left: 8px;
    flex-grow: 1;
    border: none;
    outline: none;
    height: 64px;
    font-size: 2em;
    line-height: 2em;
    text-align: right;
  }
`;

const CategoryList = styled.ul`
  padding: 20px;
  display: flex;
  align-items: center;
  overflow-x: auto;
  list-style: none;
  &::-webkit-scrollbar {
    width: 0
  }
`;

const CategoryItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
  &:last-child {
    margin-right: 0;
  }
`;

const CategoryText = styled.span`
  font-size: .8em;
  margin-top: 8px;
  color: ${props => props.theme.$subText};
  word-break: keep-all;
`;

const NoteSection = styled.section`
  display: flex;
  align-items: center;
  padding: 0 24px 24px;
  > span {
    margin-right: 8px;
    color: ${props => props.theme.$linkText};
    cursor: pointer;
  }
`;

const NumberPadSection = styled.section`
  padding: 4px;
  background: #FAFAFA;
`;

const Money: React.FC<TProps> = (props) => {
  const {closeDrawer, onSubmit, value} = props;

  const record: TRecord = value ? value : {
    date: new Date().toISOString(),
    id: new Date().getTime().toString(),
    amount: 0,
    categoryId: '1',
    note: '',
    type: 'expense'
  };

  const [type, setType] = useState<TRecordType>(record.type);
  const [amount, setAmount] = useState(record.amount);
  const [amountString, setAmountString] = useState(record.amount.toString());
  const [categoryId, setCategoryId] = useState(record.categoryId);
  const [note, setNote] = useState(record.note);

  const categories = type === 'expense' ? DEFAULT_EXPENSE_CATEGORIES : DEFAULT_INCOME_CATEGORIES;

  const onChangeAmount = (newValue: string) => {
    setAmountString(newValue);
    setAmount(parseFloat(newValue));
  };

  const addNote = () => {
    const MAX_NOTE_LENGTH = 20;

    const newNote = prompt('Add Notes', '') || '';

    if (newNote.length > MAX_NOTE_LENGTH) return alert(`Cannot exceed${MAX_NOTE_LENGTH}characters`);
    setNote(newNote);
  };

  const onOK = () => {
    if (amount === 0) return alert('Amount cannot be 0');

    const newRecord = {
      ...record,
      amount,
      categoryId,
      note,
      type
    };

    onSubmit(newRecord);

    closeDrawer();
  };

  return (
    <div>
      <TypeSection>
        <Button recordType={type === 'expense' ? 'success' : 'none'}
                onClick={() => setType('expense')}>
          Expense
        </Button>
        <Button recordType={type === 'income' ? 'warning' : 'none'}
                onClick={() => setType('income')}>
          Income
        </Button>
      </TypeSection>
      <AmountSection>
        <span>$</span>
        <div>{amountString}</div>
      </AmountSection>
      <CategoryList>
        {
          categories.map((category => (
            <CategoryItem key={category.id}
                          onClick={() => setCategoryId(category.id)}>
              <Category category={category}
                        recordType={categoryId === category.id ? type : 'none'}
                        size={20}/>
              <CategoryText>{category.name}</CategoryText>
            </CategoryItem>
          )))
        }
      </CategoryList>
      <NoteSection>
        <span onClick={addNote}>{note ? 'Edit' : 'Add Notes'}</span>
        <article>{note}</article>
      </NoteSection>
      <NumberPadSection>
        <NumberPad value={amountString}
                   recordType={type}
                   onChange={onChangeAmount}
                   onOK={onOK}/>
      </NumberPadSection>
    </div>
  );
};

export {Money};