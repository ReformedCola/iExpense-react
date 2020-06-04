import React, {useEffect, useState} from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Money from 'views/Money';
import Statistics from 'views/Statistics';
import Tags from 'views/Tags';
import NoMatch from 'views/NoMatch';
import styled from 'styled-components';
import {Tag} from './views/Tag';

type AppWrapper = {
  height: number
}

const AppWrapper = styled.div<AppWrapper>`
  position: relative;
  max-width: 480px;
  margin: 0 auto;
  background: #EDEDED;
  height: ${props => props.height + 'px'};
  color: #333;
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
    <Router>
      <AppWrapper height={height}>
        <Switch>
          <Route exact path="/tags">
            <Tags/>
          </Route>
          <Route exact path="/tags/:id">
            <Tag/>
          </Route>
          <Route exact path="/money">
            <Money/>
          </Route>
          <Route exact path="/statistics">
            <Statistics/>
          </Route>
          <Redirect exact from="/" to="/money"/>
          <Route path="*">
            <NoMatch/>
          </Route>
        </Switch>
      </AppWrapper>
    </Router>
  );
};

export default App;
