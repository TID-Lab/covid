import { Combobox } from '@headlessui/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import { fetchTags } from 'api/tag';
import { tagSchema } from 'reducers/tags/alltags';
import Icon from 'components/Icon';
//colors for customtags
interface colorprops {
  [key: string]: string;
}
const COLOR_CSS: colorprops = {
  red: 'bg-rose-100 border-rose-300',
  green: 'bg-emerald-100 border-emerald-300',
  purple: 'bg-violet-100 border-violet-300',
  blue: 'bg-blue-100 border-blue-300',
  pink: 'bg-pink-100 border-pink-300',
};

interface TagsComboBoxProps {
  activeTags: tagSchema[];
  setActiveTags: any;
  className: string;
}
const TagsComboBox = ({
  activeTags,
  setActiveTags,
  className,
}: TagsComboBoxProps) => {
  const tags = useAppSelector((state) => state.tags.alltags);
  const [query, setQuery] = useState('');

  const dispatch = useAppDispatch();
  //const [activeTags, setActiveTags] = useState([]);

  async function getTagsFromServer() {
    // make sure tags match server
    let fetchedTags = null;
    try {
      fetchedTags = await fetchTags();
      dispatch({ type: 'alltags/set', payload: fetchedTags });
    } catch (error) {
      console.log(error);
    }
  }
  function removeTagFromActive(tagId: string) {
    const removedTag = activeTags.filter((tag) => tag._id !== tagId);
    setActiveTags(removedTag);
  }

  return (
    <Combobox value={activeTags} onChange={setActiveTags} multiple nullable>
      {({ open }) => (
        <div className={`relative min-w-1/2 ${className}`}>
          <div
            className={`relative px-3 py-1 border  ${
              open
                ? 'rounded-xs bg-blue-100 border-blue-300'
                : 'rounded-xs bg-slate-50 border-slate-300'
            } `}
          >
            <Combobox.Button as="div" className="w-full ">
              <ul className="flex gap-x-1 gap-y-3 flex-wrap items-center">
                {activeTags.length > 0 &&
                  activeTags.map((tag, index) => (
                    <li
                      className={`${
                        COLOR_CSS[tag.color]
                      } px-3  rounded-2xs cursor-pointer text-sm flex gap-x-1 items-center border  hover:bg-slate-100 hover:border-slate-300`}
                      key={tag._id}
                      onClick={() => removeTagFromActive(tag._id)}
                    >
                      {tag.name}
                      <Icon type="x" size="2xs" />
                    </li>
                  ))}
                <li className="flex-1 min-w-[5rem] ">
                  <Combobox.Input
                    onChange={(event) => setQuery(event.target.value)}
                    className="w-full focus:outline-none bg-transparent"
                  />
                  <Icon
                    type="search"
                    size="sm"
                    className={`absolute top-2 right-3  ${
                      open ? 'text-blue-700' : 'text-slate-500'
                    }`}
                  />
                </li>
              </ul>
            </Combobox.Button>
          </div>
          <div>
            <Combobox.Options className="absolute w-full mt-1 py-1 shadow-lg overflow-auto text-base border border-slate-400  bg-slate-50 rounded-xs  max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
              {tags &&
                tags
                  .filter((i) => {
                    if (query)
                      return (
                        i.name.includes(query) &&
                        !activeTags.some((a) => a._id === i._id)
                      );
                    else return !activeTags.some((a) => a._id === i._id);
                  })
                  .map((tag) => (
                    <Combobox.Option
                      key={tag.name}
                      value={tag}
                      className={`hover:bg-slate-200 cursor-pointer py-2 pl-3 `}
                    >
                      <span
                        className={`${
                          COLOR_CSS[tag.color]
                        } px-3 py-0.5 rounded-2xs border`}
                      >
                        {tag.name}
                      </span>
                    </Combobox.Option>
                  ))}
            </Combobox.Options>
          </div>
        </div>
      )}
    </Combobox>
  );
};

export default TagsComboBox;
