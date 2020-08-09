import styled from 'styled-components';
import {Link, useLocation} from 'react-router-dom';
import * as React from 'react';
import Icon from './Icon';
import theme from 'theme';

type TNavItem = {
  selected: boolean
}

const NavWrapper = styled.nav`
  padding: 12px 0;
  background: white;
  box-shadow: 0px -2px 12px 0px rgba(192, 196, 204, 0.4);
  z-index: 2;
  a {
    text-decoration: none;
  }
  .selected {
    color: ${props => props.theme.$success}
  }
`;

const NavItem = styled(Link)<TNavItem>`
  flex-grow: 1;
  width: 33.333%;
  float: left;
  color: ${props => props.theme.$normalText};
  font-size: ${props => props.theme.$normalTextSize};
  text-align: center;
  > div {
    margin-top: 4px;
    color: ${props => props.selected ? props.theme.$success : props.theme.$normalText};
    text-align: center;
  }
`;

const Nav: React.FC = () => {
  const {pathname} = useLocation();
  return (
    <NavWrapper className="clearfix">
      <NavItem to="/" selected={pathname === '/'}>
        {
          pathname === '/' ?
            <Icon name="details" size={24} color={theme.$success}/> :
            <Icon name="details" size={24}/>
        }
        <div>Summary</div>
      </NavItem>
      <NavItem to="/analysis" selected={pathname === '/analysis'}>
        {
          pathname === '/analysis' ?
            <Icon name="statistics" size={24} color={theme.$success}/> :
            <Icon name="statistics" size={24}/>
        }
        <div>Chart</div>
      </NavItem>
      <NavItem to="/settings" selected={pathname === 'settings'}>
        {
          pathname === '/settings' ?
            <Icon name="setting" size={24} color={theme.$success}/> :
            <Icon name="setting" size={24}/>
        }
        <div>Settings</div>
      </NavItem>
    </NavWrapper>
  );
};

export default Nav;

