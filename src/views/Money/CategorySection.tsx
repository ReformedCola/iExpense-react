import styled from 'styled-components';
import React, {useState} from 'react';

const Wrapper = styled.section`
  font-size: 24px;
  > ul { display: flex;
    > li {
      width: 50%; text-align: center;
      padding: 16px 0; position: relative;
      &.selected::after {
        content: ''; display: block; height: 3px;
        background: #333; position: absolute;
        bottom: 0; width: 100%; left: 0;
      }
    }
  }
`;

type Category = '-' | '+'
type Props = {
  value: Category;
  onChange: (value: Category) => void;
}
const CategorySection: React.FC<Props> = (props) => {
  const categoryMap = {'-': 'Expense', '+': 'Income'};
  type Keys = keyof typeof categoryMap
  const [categoryList] = useState<Keys[]>(['-', '+']);
  const category = props.value;
  return (
    <Wrapper>
      <ul>
        {categoryList.map(c =>
          <li className={category === c ? 'selected' : ''}
              onClick={() => {props.onChange(c);}}
              key={c}
          >
            {categoryMap[c]}
          </li>
        )}
      </ul>
    </Wrapper>
  );
};

export {CategorySection};