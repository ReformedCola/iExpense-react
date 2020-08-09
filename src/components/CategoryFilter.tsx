import * as React from 'react';
import styled from 'styled-components';
import {ALL_TYPE, DEFAULT_EXPENSE_CATEGORIES, DEFAULT_INCOME_CATEGORIES} from 'lib/category';
import {RecordType} from 'hooks/useRecords';
import theme from 'theme';

type Props = {
  recordType: RecordType
  value: string
  closeDrawer: () => void
  onSubmit: (id: string, type: RecordType) => void
}

type TCategoryItem = {
  recordType: RecordType
  selected: boolean
}

const BACKGROUND = {
  expense: theme.$success,
  income: theme.$warning
};

const StyledCategoryFilter = styled.section`
  max-height: 48vh;
  padding: 32px 16px;
  background:  #FAFAFA;
  overflow-y: auto;
  .selected {
    background: ${props => props.theme.$success};
    color: white;
  }
`;

const Tag = styled.p`
  margin: 8px 0 8px 4px;
  color: ${props => props.theme.$subText};
`;

const FilterSection = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const CategoryItem = styled.div<TCategoryItem>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 33.33333%;
  padding: 16px;
  border: 4px solid #FAFAFA;
  border-radius: 6px;
  font-size: 1.1em;
  cursor: pointer;
  background: ${props => props.selected ? BACKGROUND[props.recordType] : 'white'};
  color: ${props => props.selected ? 'white' : props.theme.$normalText}
`;

const CategoryFilter: React.FC<Props> = (props) => {
  const {value, recordType, closeDrawer, onSubmit} = props;

  const submit = (id: string, type: RecordType) => {
    onSubmit(id, type);
    closeDrawer();
  };

  return (
    <StyledCategoryFilter>
      <CategoryItem selected={value === ALL_TYPE}
                    recordType="expense"
                    onClick={() => submit(ALL_TYPE, 'expense')}>
        All
      </CategoryItem>

      <Tag>Expense</Tag>
      <FilterSection>
        {
          DEFAULT_EXPENSE_CATEGORIES.map(c => (
            <CategoryItem key={c.id}
                          recordType="expense"
                          onClick={() => submit(c.id, 'expense')}
                          selected={recordType === 'expense' && value === c.id}>
              {c.name}
            </CategoryItem>
          ))
        }
      </FilterSection>

      <Tag>Income</Tag>
      <FilterSection>
        {
          DEFAULT_INCOME_CATEGORIES.map(c => (
            <CategoryItem key={c.id}
                          recordType="income"
                          onClick={() => submit(c.id, 'income')}
                          selected={recordType === 'income' && value === c.id}>
              {c.name}
            </CategoryItem>
          ))
        }
      </FilterSection>
    </StyledCategoryFilter>
  );
};

export default CategoryFilter;
