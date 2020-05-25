import Layout from 'components/Layout';
import React from 'react';
import styled from 'styled-components';
import {CategorySection} from './Money/CategorySection';
import {NotesSection} from './Money/NotesSection';
import {NumberPadSection} from './Money/NumberPadSection';
import {TagsSection} from './Money/TagsSection';

const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`;

function Money() {
  return (
    <MyLayout>
      <TagsSection>
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
        <div className="output">
          100
        </div>
        <div className="pad clearfix">
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
          <button className="ok">OK</button>
          <button className="zero">0</button>
          <button>.</button>
        </div>
      </NumberPadSection>
    </MyLayout>
  );
}

export default Money;