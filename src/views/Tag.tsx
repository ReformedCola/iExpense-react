import React from 'react';
import {useTags} from 'useTags';
import {useParams} from 'react-router-dom';
import Layout from 'components/Layout';
import Icon from 'components/Icon';
import {Button} from 'components/Button';
import styled from 'styled-components';

type Params = {
  id: string;
}
const Topbar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 20px;
  padding: 14px;
  background: white;
`

const Tag: React.FC = () => {
  const {findTag} = useTags();
  let {id} = useParams<Params>();
  const tag = findTag(parseInt(id));
  return (
    <Layout>
      <Topbar>
        <Icon name="left"/>
        <span>Edit Tag</span>
        <Icon/>
      </Topbar>
      <div>
        <label>
          <span>Tag Name:</span>
          <input type="text" placeholder="Tag Name"/>
        </label>
      </div>
      <div>
        <Button>Delete Tag</Button>
      </div>
    </Layout>
  );
};

export {Tag};