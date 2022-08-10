import Button from 'components/Button';
import { createResource } from 'api/resource';
import notify from 'util/notify';
import { useEffect, useState } from 'react';
import { COVID_TOPICS, COVID_TOPICS_TYPE } from 'util/filterData';
import c from './index.module.css';
import ChipSelector from 'components/ChipSelector';
import Icon from 'components/Icon';

const TYPES = {
  website: 'Website',
  video: 'Video',
  pdf: 'PDF',
  image: 'Image',
};

interface ResourceSchema {
  authoredAt: number;
  fetchedAt: number;
  author: string;
  organization?: any;
  name: string;
  desc?: string;
  url: string;
  type: keyof typeof TYPES;
  topics: any[];
  platformID?: string;
  content?: string;
  raw?: string;
  language: 'en' | 'es';
  imageurl?: string;
}

interface NewResourceProps {
  resource?: ResourceSchema;
  onClose: any;
}

let imageTimeout: any;

const NewResource = ({ resource, onClose }: NewResourceProps) => {
  const authoredAt = Date.now();
  const fetchedAt = Date.now();
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<keyof typeof TYPES>('website');
  const [imageurl, setImageUrl] = useState('');
  const [imageurlPreview, setImageUrlPreview] = useState('');

  const [topics, setTopics] = useState<string[]>([]);
  const [imageLoaded, setImageLoaded] = useState<
    'unloaded' | 'success' | 'fail'
  >('unloaded');

  useEffect(() => {
    if (resource) {
      setName(resource.name);
      setAuthor(resource.author);
      setUrl(resource.url);
      setType(resource.type);
      if (resource.imageurl) {
        setImageUrl(resource.imageurl);
        setImageUrlPreview(resource.imageurl);
      }
    }
    return () => {
      clearTimeout(imageTimeout);
    };
  }, []);

  function onNameChange(event: any) {
    setName(event.target.value);
  }

  function onAuthorChange(event: any) {
    setAuthor(event.target.value);
  }

  function onUrlChange(event: any) {
    setUrl(event.target.value);
  }

  function onImageUrlChange(event: any) {
    setImageUrl(event.target.value);
    setImageLoaded('unloaded');
    clearTimeout(imageTimeout);
    //defer to slow down image calls
    imageTimeout = setTimeout(() => {
      setImageUrlPreview(event.target.value);
    }, 1000);
  }

  async function onClick() {
    try {
      var createdResource = null;
      var buildResource: ResourceSchema = {
        authoredAt,
        fetchedAt,
        author,
        name,
        url,
        type,
        topics,
        language: 'en',
      };
      if (imageurl) buildResource = { ...buildResource, imageurl };
      createdResource = await createResource(buildResource);

      if (createdResource) {
        notify('Resource saved to database.');
        onClose();
        setName('');
        setAuthor('');
        setUrl('');
        setType('website');
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
    <div className={` ${c.NewResource} flex flex-col gap-y-2 px-6`}>
      <div className="flex flex-col gap-4">
        <ChipSelector
          adjust="mr-7"
          header="Type of Resource"
          onSelect={(id: keyof typeof TYPES) => setType(id)}
          options={TYPES}
          active={type}
        />
        <div>
          <label className={c.label}>{`${TYPES[type]} `} URL</label>
          <input
            className="py-1 px-2 w-full"
            type="text"
            value={url}
            onChange={onUrlChange}
            placeholder="Type in a URL"
          />
        </div>
        <hr className="border-b border-slate-300 my-2" />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div>
              <label className={c.label}>Title: </label>
              <input
                className="py-1 px-2 w-full"
                type="text"
                value={name}
                onChange={onNameChange}
                placeholder="title of resource"
              />
            </div>
            <div className="flex gap-x-2 w-full">
              <div className="flex-1">
                <label className={c.label}>Author: </label>
                <input
                  className="py-1 px-2 w-full"
                  type="text"
                  value={author}
                  onChange={onAuthorChange}
                  placeholder="Author"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="bg-slate-100 border border-slate-300 rounded-xs w-full h-[10rem]">
              <div className="flex justify-center items-center h-full">
                <img
                  src={imageurlPreview}
                  onLoad={() => setImageLoaded('success')}
                  className={
                    imageLoaded === 'success'
                      ? 'w-full h-full object-scale-down '
                      : 'invisible w-0 h-0 basis-0 '
                  }
                  onError={() => imageurlPreview && setImageLoaded('fail')}
                />
                {imageLoaded === 'unloaded' && (
                  <p className="text-sm">Image Preview</p>
                )}
                {imageLoaded === 'fail' && (
                  <p className="text-sm">Image failed to load</p>
                )}
              </div>
            </div>
            {type !== 'image' && (
              <div>
                <label className={c.label}>Image URL: </label>
                <input
                  className="py-1 px-2 w-full"
                  type="text"
                  value={imageurl}
                  onChange={onImageUrlChange}
                  placeholder="Image URL"
                ></input>
              </div>
            )}
          </div>
        </div>
      </div>

      <label className={c.label}>Topics:</label>
      <ul className="flex flex-wrap gap-x-2 gap-y-4">
        {Object.keys(COVID_TOPICS).map((key, index) => (
          <li
            key={index}
            className="flex items-center gap-x-2 px-4 py-2 rounded-full bg-slate-100 w-fit"
          >
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
      <div className="flex justify-end gap-x-3">
        <Button variant="outline" className="w-fit" onClick={onClose}>
          Cancel
        </Button>
        <Button className="w-fit" onClick={onClick}>
          {resource ? (
            <>Save Changes</>
          ) : (
            <>
              <Icon type="plus" /> Create Resource
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NewResource;
