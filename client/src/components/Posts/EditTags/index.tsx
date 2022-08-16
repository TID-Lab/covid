//@ts-nocheck
import { fetchTags, deleteTag, createTag, editTag } from 'api/tag';
import { useState, useEffect, useCallback, useRef } from 'react';
import PopupModal from 'components/PopupModal';
import { createOrganization } from 'api/org';
import Button from 'components/Button';
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import { Combobox, Dialog } from '@headlessui/react';
import Icon from 'components/Icon';

//colors for customtags
const COLORS = {
  red: 'Red',
  green: 'Green',
  purple: 'Purple',
  blue: 'Blue',
  pink: 'Pink',
};

//colors for customtags
const COLOR_CSS = {
  red: 'bg-rose-200 border-rose-300',
  green: 'bg-emerald-200 border-emerald-300',
  purple: 'bg-violet-200 border-violet-300',
  blue: 'bg-blue-200 border-blue-300',
  pink: 'bg-pink-200 border-pink-300',
};

interface EditTagsProps {
  postId: string;
}
const EditTags = ({ postId }: EditTagsProps) => {
  const [showCreateTagModal, setCreateTagShowModal] = useState(false);
  let nameTextAreaRef = useRef<HTMLTextAreaElement>(null);
  let descTextAreaRef = useRef<HTMLTextAreaElement>(null);
  let colorTextAreaRef = useRef<HTMLSelectElement>(null);
  const [showFutureUseTagModal, setFutureUseTagShowModal] = useState(false); //temp need to change
  const [showTagModal, setShowTagModal] = useState(false);
  // const [tagName, setTagName] = useState('Name for new tag');
  // const [tagcolor, setColor] = useState('Set Custom Tag Color');
  // const [tagDescription, setTagDescription] = useState(
  //   'Description for new tag'
  // );
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags.alltags);
  const [activeTags, setActiveTags] = useState([]);
  let timeout;
  // when tags set, set local "activetags" state
  useEffect(() => {
    if (tags) {
      const getActiveTags = tags.filter((tag) =>
        tag.posts.find((item) => item === postId)
      );
      setActiveTags(getActiveTags);
    }
    console.log(tags);
  }, [tags]);
  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  // when activetags set, send to server
  // very inefficeint (i cant spell), lets refactor ASAP. i think this should be handled server side. bet theres like a mongodb function we could use
  function saveTagsToServer() {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      tags.forEach((tag) => {
        // if tags are to be added to post
        if (activeTags.some((aTag) => aTag._id === tag._id)) {
          //if post doesnt already exists in tag
          if (!tag.posts.some((id) => id === postId)) {
            const newTag = { ...tag, posts: [...tag.posts, postId] };
            editTag(tag, newTag);
          }
        } else {
          // if tags are to be removed from post
          // if post exists in tag
          if (tag.posts.some((id) => id === postId)) {
            const newPosts = tag.posts.filter((id) => id !== postId);
            const newTag = { ...tag, posts: newPosts };
            editTag(tag, newTag);
          }
        }
      });
      await getTagsFromServer();
      setShowTagModal(false);
    }, 200);
  }
  // make sure this function doesn't get called unnessisairly (i cant spell)
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
  // Function for opening tag popup
  async function tagPopup() {
    await getTagsFromServer();
    setShowTagModal(true);
  }

  function removeTagFromActive(tagId: string) {
    const removedTag = activeTags.filter((tag) => tag._id !== tagId);
    setActiveTags(removedTag);
  }

  // Function for opening create new tag popup
  function createTagPopup() {
    //   e.preventDefault();
    setCreateTagShowModal(true);
    setShowTagModal(false);
  }

  // Function for returning to main tag popup from child popups
  function backToTagPopup() {
    setCreateTagShowModal(false);
    setFutureUseTagShowModal(false);
    setShowTagModal(true);
  }

  // Function for opening "Save for future use" popup
  function saveForFutureUsePopup(e: any) {
    e.preventDefault();
    setShowTagModal(false);
    setFutureUseTagShowModal(true);
  }

  // Function for "confirm" button to create new tag with name and description
  async function createNewTagButton(e: any) {
    // e.preventDefault();
    const tagName = nameTextAreaRef.current!.value;
    const tagDesc = descTextAreaRef.current!.value;
    const tagColor = colorTextAreaRef.current!.value;

    if (!tagName || !tagDesc || !tagColor) return;
    // setTagName(tagName);
    // setTagDescription(tagDesc);
    // setColor(tagColor);
    //  setCustomTagField(nameTextAreaRef.current!.value);
    const checkDupes = () => {
      if (tags) {
        for (var i = 0; i < tags.length; i++) {
          var name = tags[i].name;
          var dupTag = tags[i];
          console.log(tagName === name);
          if (tagName === name) {
            console.log(dupTag);
            deleteTag(dupTag);
          }
        }
      }
    };
    checkDupes();
    //mongo POST
    const new_tag = createTag({
      name: tagName,
      color: tagColor,
      description: tagDesc,
      posts: [postId],
    });
    //reset
    // setTagName('');
    // setTagDescription('');
    // setColor('');

    console.log(new_tag);
    await getTagsFromServer();
    backToTagPopup();
  }

  return (
    <>
      <Button className="mx-2 text-xs" size="sm" onClick={tagPopup}>
        +
      </Button>

      {/* <Dialog>
        <Dialog.Panel>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog description</Dialog.Description>
        </Dialog.Panel>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem rem
          maiores labore eos repellat ducimus unde vitae exercitationem rerum
          voluptate veritatis voluptates omnis odit at, quae quis nemo
          repellendus totam?
        </p>
      </Dialog> */}
      <PopupModal isOpen={showTagModal} onClose={() => setShowTagModal(false)}>
        <label className="mb-2">Add or remove custom tags:</label>
        <Combobox value={activeTags} onChange={setActiveTags} multiple>
          <div className="relative w-fit min-w-1/2">
            <div className="relative px-3 py-1 mb-2 border rounded bg-slate-50 border-slate-300">
              <div className="flex gap-x-2">
                {activeTags.length > 0 && (
                  <ul className="flex text-sm gap-x-1">
                    {activeTags.map((tag, index) => (
                      <li
                        className={`${
                          COLOR_CSS[tag.color]
                        } px-3 py-1 rounded cursor-pointer`}
                        key={tag._id}
                        onClick={() => removeTagFromActive(tag._id)}
                      >
                        {tag.name}
                      </li>
                    ))}
                  </ul>
                )}
                <Combobox.Input className="w-full" />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <Icon type="chevron-down-sm" />
                </Combobox.Button>
              </div>
            </div>

            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {tags &&
                tags.map((tag) => (
                  <Combobox.Option
                    key={tag.name}
                    value={tag}
                    className={`hover:bg-slate-200 cursor-pointer py-2 pl-3 `}
                  >
                    <span
                      className={`${COLOR_CSS[tag.color]} px-3 py-1 rounded `}
                    >
                      {tag.name}
                    </span>
                  </Combobox.Option>
                ))}
            </Combobox.Options>
          </div>
        </Combobox>
        <div className="flex gap-x-2 mt-[15rem]">
          <Button className="text-xs" onClick={saveTagsToServer}>
            Save {'&'} Close
          </Button>
          <Button
            className="text-xs"
            variant="outline"
            onClick={createTagPopup}
          >
            + create new tag
          </Button>
        </div>
      </PopupModal>
      <PopupModal
        isOpen={showCreateTagModal}
        onClose={() => setCreateTagShowModal(false)}
      >
        <b>Create a New Tag</b>
        <p>Tag Name</p>
        <textarea
          id="tagName"
          name="tagName"
          rows={1}
          ref={nameTextAreaRef}
        ></textarea>
        <p>Tag Color</p>
        <select
          //onChange={(e) => setColor(e.currentTarget.value)}
          ref={colorTextAreaRef}
        >
          {Object.keys(COLORS).map((val, index) => (
            <option key={index} value={val}>
              {COLORS[val as keyof typeof COLORS]}
            </option>
          ))}
        </select>
        <p>Tag Description</p>
        <textarea id="tagDesc" name="tagDesc" ref={descTextAreaRef}></textarea>
        <p>
          <Button className="submitButton" onClick={createNewTagButton}>
            Confirm
          </Button>
        </p>
      </PopupModal>

      <PopupModal
        isOpen={showFutureUseTagModal}
        onClose={() => setFutureUseTagShowModal(false)}
      >
        <p>
          <Button className="tagPopupBack" onClick={backToTagPopup}>
            &larr; Back to Tags
          </Button>
        </p>
        <b>Save for future use</b>
      </PopupModal>
    </>
  );
};

export default EditTags;
