//@ts-nocheck
import { fetchTags, deleteTag, createTag, editTag } from 'api/tag';
import { useState, useEffect, useCallback, useRef } from 'react';
import PopupModal from 'components/PopupModal';
import { createOrganization } from 'api/org';
import Button from 'components/Button';
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
//colors for customtags
const COLORS = {
  red: 'Red',
  green: 'Green',
  purple: 'Purple',
  blue: 'Blue',
  pink: 'Pink',
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
  const [showTagModal, setTagShowModal] = useState(false);
  const [tagName, setTagName] = useState('Name for new tag');
  const [tagcolor, setColor] = useState('Set Custom Tag Color');
  const [tagDescription, setTagDescription] = useState(
    'Description for new tag'
  );
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags.alltags);

  async function getTagsFromServer() {
    // make sure tags match server
    let fetchedTags;
    try {
      fetchedTags = await fetchTags();
      dispatch({ type: 'tags/set', payload: tags });
    } catch (error) {
      console.log(error);
    }
  }
  // Function for opening tag popup
  function tagPopup() {
    setTagShowModal(true);
    console.log('test');
  }

  // Function for opening create new tag popup
  function createTagPopup() {
    //   e.preventDefault();
    setCreateTagShowModal(true);
    setTagShowModal(false);
  }

  // Function for returning to main tag popup from child popups
  function backToTagPopup() {
    setCreateTagShowModal(false);
    setFutureUseTagShowModal(false);
    setTagShowModal(true);
  }

  // Function for opening "Save for future use" popup
  function saveForFutureUsePopup(e: any) {
    e.preventDefault();
    setTagShowModal(false);
    setFutureUseTagShowModal(true);
  }

  // Function for "confirm" button to create new tag with name and description
  function createNewTagButton(e: any) {
    // e.preventDefault();
    const tagName = nameTextAreaRef.current!.value;
    const tagDesc = descTextAreaRef.current!.value;
    const tagColor = colorTextAreaRef.current!.value;
    setTagName(tagName);
    setTagDescription(tagDesc);
    setColor(tagColor);
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
    setTagName('');
    setTagDescription('');
    setColor('');

    console.log(new_tag);
  }

  return (
    <>
      <Button className="text-xs" onClick={tagPopup}>
        +
      </Button>
      <Button className="text-xs" onClick={createTagPopup}>
        + create tag
      </Button>
      <PopupModal
        isOpen={showCreateTagModal}
        onClose={() => setCreateTagShowModal(false)}
      >
        <p>
          <button className="tagPopupBack" onClick={backToTagPopup}>
            &larr; Back to Tags
          </button>
        </p>
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
          onChange={(e) => setColor(e.currentTarget.value)}
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
