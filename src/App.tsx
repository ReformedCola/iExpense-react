import React, {useEffect, useState} from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from 'theme';
import {NoMatch} from 'views/NoMatch';
import {Summary} from 'views/Summary';
import {Settings} from 'views/Settings';
import {Statistics} from 'views/Statistics';
import {EditRecord} from './views/EditRecord';

type TAppWrapper = {
  height: number
}

const AppWrapper = styled.div<TAppWrapper>`
  position: relative;
  max-width: 480px;
  margin: 0 auto;
  background: #EDEDED;
  height: ${props => props.height + 'px'};
`;

const App: React.FC = () => {
  const [height, setHeight] = useState(window.innerHeight);

  const onResize = () => {
    setHeight(window.innerHeight * 0.01);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return window.removeEventListener('resize', onResize);
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppWrapper height={height}>
          <Switch>
            <Route exact path="/">
              <Summary/>
            </Route>
            <Route exact path="/analysis">
              <Statistics/>
            </Route>
            <Route exact path="/settings">
              <Settings/>
            </Route>
            <Route exact path="/record/:id">
              <EditRecord/>
            </Route>
            <Route path="*">
              <NoMatch/>
            </Route>
          </Switch>
        </AppWrapper>
      </Router>
    </ThemeProvider>
  );
};

export {App};
