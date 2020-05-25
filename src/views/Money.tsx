import Layout from 'components/Layout';
import React from 'react';
import styled from 'styled-components';

const TagsSection = styled.section`
  background: #ffffff; padding: 12px 16px;
  > ol { margin: 0 -12px;
    > li {
      background: #d9d9d9; border-radius: 18px;
      display: inline-block; padding: 3px 18px;
      font-size: 14px; margin: 8px 12px;
    }
  }
  > button {
    background: none; border: none; padding: 2px 4px;
    border-bottom: 1px solid #333; color: #666;
    margin-top: 8px;
  }
`;

const NotesSection = styled.section`
  background: #f5f5f5; padding: 0 16px; font-size: 14px;
  > label {
    display: flex; align-items: center;
    > span {
      margin-right: 16px; white-space: nowrap;
    }
    > input {
      display: block; width: 100%; height: 72px;
      background: none; border: none;
    }
  }
`;

const CategorySection = styled.section`
  font-size: 24px;
  > ul {
    display: flex;
    background: #c4c4c4;
    > li {
      width: 50%;
      text-align: center;
      padding: 16px 0;
      position: relative;
      &.selected::after {
        content: '';
        display: block;
        height: 3px;
        background: #333;
        position: absolute;
        bottom: 0;
        width: 100%;
        left: 0;
      }
    }
  }
`;

const NumberPadSection = styled.section`

`;


function Money() {
  return (
    <Layout>
      <TagsSection>
        <ol>
          <li>Cloth</li>
          <li>Food</li>
          <li>Living</li>
          <li>Travel</li>
        </ol>
        <button>New Tag</button>
      </TagsSection>
      <NotesSection>
        <label>
          <span>Notes:</span>
          <input type="text" placeholder="Tap to add your notes here ~"/>
        </label>
      </NotesSection>
      <CategorySection>
        <ul>
          <li className="selected">Expense</li>
          <li>Income</li>
        </ul>
      </CategorySection>
      <NumberPadSection>
        <div>
          100
        </div>
        <div>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>Del</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>AC</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>OK</button>
          <button>0</button>
          <button>.</button>
        </div>
      </NumberPadSection>
    </Layout>
  );
}

export default Money;