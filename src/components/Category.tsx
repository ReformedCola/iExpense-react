import * as React from 'react';
import styled from 'styled-components';
import Icon from './NewIcon';
import {CATEGORY_COLOR} from 'lib/category';
import {RecordType} from 'hooks/useRecords';

export type TCategory = {
  id: string
  name: string
  iconName: string
}

type Props = {
  category: TCategory
  recordType: RecordType | 'none'
  size?: number
}

type TStyledCategory = {
  background: string
  fill: string
}

const StyledCategory = styled.span<TStyledCategory>`
  padding: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.background};
  border-radius: 50%;
  svg {
    fill: ${props => props.fill}
  }
`;

const Category: React.FC<Props> = (props) => {
  const {category, recordType, size} = props;

  const color = CATEGORY_COLOR[recordType];

  return (
    <StyledCategory {...color}>
      <Icon name={category.iconName} size={size}/>
    </StyledCategory>
  );
};

Category.defaultProps = {
  size: 24
};

export default Category;