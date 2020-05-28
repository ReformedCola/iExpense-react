import {useEffect, useState} from 'react';
import {createId} from 'lib/createId';
import {useUpdate} from 'hooks/useUpdate';

const useTags = () => {
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  useEffect(() => {
    let localTags = JSON.parse(window.localStorage.getItem('tags') || '[]');
    if (localTags.length === 0) {
      localTags = [
        {id: createId(), name: 'Cloth'},
        {id: createId(), name: 'Food'},
        {id: createId(), name: 'Travel'},
      ]
    }
    setTags(localTags);
  }, []); // execute when mounted
  useUpdate(() => {
    window.localStorage.setItem('tags', JSON.stringify(tags))
  }, [tags]);
  const findTag = (id: number) => tags.filter(tag => tag.id === id)[0];
  const findTagIndex = (id: number) => {
    let result = -1;
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].id === id) {
        result = i;
        break;
      }
    }
    return result;
  };
  const updateTag = (id: number, {name}: { name: string }) => {
    setTags(tags.map(tag => tag.id === id ? {id, name} : tag));
  };
  const deleteTag = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id));
  };
  const addTag = () => {
    const tagName = window.prompt('Enter the name of the tag:');
    if (tagName !== null && tagName !== '') {
      setTags([...tags, {id: createId(), name: tagName}]);
    }
  };

  const getName = (id: number) => {
    const tag = tags.filter(t => t.id === id)[0];
    return tag ? tag.name : '';
  };
  return {tags, getName, setTags, findTag, updateTag, findTagIndex, deleteTag, addTag};
};

export {useTags};
