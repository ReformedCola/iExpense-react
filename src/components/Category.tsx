import * as React from 'react';
import styled from 'styled-components';
import {Icon} from './Icon';
import {CATEGORY_COLOR} from 'lib/category';
import {TRecordType} from 'hooks/useRecords';

export type TCategory = {
  id: string
  name: string
  iconName: string
}

type TProps = {
  category: TCategory
  recordType: TRecordType | 'none'
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
    fill: ${props => props.fill};
    color: white;
  }
`;

const Category: React.FC<TProps> = (props) => {
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

export {Category};