import {useState} from 'react';

const useTags = () => {
  const [tags, setTags] = useState<string[]>(['Cloth', 'Food', 'Travel']);
  return {tags, setTags}
};

export {useTags};
