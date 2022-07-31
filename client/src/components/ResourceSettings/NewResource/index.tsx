import Button from 'components/Button';
import { createResource } from 'api/resource';
import { useHidePopup } from 'hooks/popup';
import notify from 'util/notify';
import { useState } from 'react';
import { COVID_TOPICS, COVID_TOPICS_TYPE } from 'util/filterData';
import c from './index.module.css';
import TopicSettings from 'components/TopicSettings';

const TYPES = ['website', 'video', 'pdf', 'image'];

interface NewResourceProps {
  onClose: any;
}
const NewResource = ({ onClose }: NewResourceProps) => {
  const authoredAt = Date.now();
  const fetchedAt = Date.now();
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState(TYPES[0]);
  const [imageurl, setImageUrl] = useState('');
  const [topics, setTopics] = useState<string[]>([]);

  const hidePopup = useHidePopup();

  function onNameChange(event: any) {
    setName(event.target.value);
  }

  function onAuthorChange(event: any) {
    setAuthor(event.target.value);
  }

  function onUrlChange(event: any) {
    setUrl(event.target.value);
  }

  function onTypeChange(event: any) {
    setType(event.target.value);
  }

  function onImageUrlChange(event: any) {
    setImageUrl(event.target.value);
  }

  async function onClick() {
    try {
      var resource = null;
      if (!imageurl) {
        resource = await createResource({
          authoredAt,
          fetchedAt,
          author,
          name,
          url,
          type,
          topics,
        });
      } else {
        resource = await createResource({
          authoredAt,
          fetchedAt,
          author,
          name,
          url,
          type,
          imageurl,
          topics,
        });
      }
      if (resource) {
        notify('Resource saved to database.');
        onClose();
        setName('');
        setAuthor('');
        setUrl('');
        setType(TYPES[0]);
      } else {
        notify(
          'An error occurred. Pleas make sure resource has a Name, Author, and URL.'
        );
      }
    } catch (err) {
      notify('An error occurred.');
    }
  }

  function onTopicsChange(key: COVID_TOPICS_TYPE) {
    if (topics.find((i) => i === COVID_TOPICS[key])) {
      const removedTopics = topics.filter((i) => i !== COVID_TOPICS[key]);
      setTopics(removedTopics);
    } else {
      const addTopics = [...topics, COVID_TOPICS[key]];
      setTopics(addTopics);
    }
  }

  return (
    <div className={`Modal ${c.NewResource} flex flex-col gap-y-2`}>
      <h1 className="font-bold text-lg">New Resource</h1>
      <div>
        <label className="block">Type: </label>
        <select onChange={onTypeChange} value={type} className="py-1 px-2">
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block">Name: </label>
          <input
            className="py-1 px-2"
            type="text"
            value={name}
            onChange={onNameChange}
            placeholder="Name"
          />
        </div>
        <div>
          <label className="block">Author: </label>
          <input
            className="py-1 px-2"
            type="text"
            value={author}
            onChange={onAuthorChange}
            placeholder="Author"
          />
        </div>
        <div>
          <label className="block">URL: </label>
          <input
            className="py-1 px-2"
            type="text"
            value={url}
            onChange={onUrlChange}
            placeholder="URL"
          />
        </div>
        <div>
          {type !== 'image' && <p>Image URL: </p>}
          {type !== 'image' && (
            <input
              className="py-1 px-2"
              type="text"
              value={imageurl}
              onChange={onImageUrlChange}
              placeholder="Image URL"
            ></input>
          )}
        </div>
      </div>

      <label>Topics:</label>
      <ul className="flex flex-wrap gap-x-2 gap-y-4 w-1/2">
        {Object.keys(COVID_TOPICS).map((key, index) => (
          <li className="flex items-center gap-x-2 px-4 py-2 rounded-full bg-slate-100 w-fit">
            <input
              type="checkbox"
              onChange={() => onTopicsChange(key as COVID_TOPICS_TYPE)}
            ></input>
            <label className="inline-block w-fit">
              {COVID_TOPICS[key as COVID_TOPICS_TYPE]}
            </label>
          </li>
        ))}
      </ul>
      <Button className="w-fit" onClick={onClick}>
        + Create Resource
      </Button>
    </div>
  );
};

export default NewResource;
