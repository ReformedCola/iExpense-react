import {useState} from 'react';

const useTags = () => {
  const [tags, setTags] = useState<{id: number; name: string}[]>([
    {id: 1, name: 'Cloth'},
    {id: 2, name: 'Food'},
    {id: 3, name: 'Travel'},
  ]);
  return {tags, setTags}
};

export {useTags};
