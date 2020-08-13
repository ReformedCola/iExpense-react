import * as React from 'react';
import {Nav} from './Nav';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 52px 14px 16px;
  background: ${props => props.theme.$success};
  color: ${props => props.theme.$white};
  .title {
    text-align: center;
    font-size: ${props => props.theme.$largeTextSize};
  }
`;

const Layout: React.FC = (props) => {
  return (
    <Wrapper>
      <Header>
        <p className="title">iExpense</p>
      </Header>
      {props.children}
      <Nav/>
    </Wrapper>
  );
};

export {Layout};