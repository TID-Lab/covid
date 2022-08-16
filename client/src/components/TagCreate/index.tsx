import { createTag, deleteTag, fetchTags } from 'api/tag';
import Button from 'components/Button';
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import { useState, useRef } from 'react';
//colors for customtags
const COLORS = {
  red: 'Red',
  green: 'Green',
  purple: 'Purple',
  blue: 'Blue',
  pink: 'Pink',
};
interface TagCreateProps {
  postId?: string;
  onClose: any;
}
const TagCreate = ({ postId, onClose }: TagCreateProps) => {
  const [tagName, setTagName] = useState('');
  let descTextAreaRef = useRef<HTMLTextAreaElement>(null);
  let colorTextAreaRef = useRef<HTMLSelectElement>(null);
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags.alltags);
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
  // Function for "confirm" button to create new tag with name and description
  async function createNewTagButton(e: any) {
    // e.preventDefault();
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
      posts: postId ? [postId] : [],
    });
    //reset
    // setTagName('');
    // setTagDescription('');
    // setColor('');

    console.log(new_tag);
    await getTagsFromServer();
    onClose();
  }
  return (
    <div>
      <b>Create a New Tag</b>
      <p>Tag Name</p>
      <input
        type="text"
        id="tagName"
        name="tagName"
        className="input px-3 py-1 w-full"
        onChange={(e) => setTagName(e.target.value)}
      />

      <p>Tag Description</p>
      <textarea
        className="input px-3 py-1 w-full"
        id="tagDesc"
        name="tagDesc"
        ref={descTextAreaRef}
      />
      <p>Tag Color</p>
      <select
        className="input px-3 py-1 mb-4"
        //onChange={(e) => setColor(e.currentTarget.value)}
        ref={colorTextAreaRef}
      >
        {Object.keys(COLORS).map((val, index) => (
          <option key={index} value={val}>
            {COLORS[val as keyof typeof COLORS]}
          </option>
        ))}
      </select>
      <p>
        <Button className="submitButton" onClick={createNewTagButton}>
          Confirm
        </Button>
      </p>
    </div>
  );
};

export default TagCreate;
