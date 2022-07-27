import Button from 'components/Button';
import { ResourceSchema } from 'reducers/resources';
import AuthorInfo from '../AuthorInfo';
import useTracker from 'hooks/useTracker';
import { SyntheticEvent, useState } from 'react';
import Icon, { iconType } from 'components/Icon';
interface ResourcesPostProps {
  data: ResourceSchema;
}
interface typeToIconType {
  [key: string]: iconType;
}
const typeToIcon: typeToIconType = {
  image: 'image',
  website: 'link',
  pdf: 'file-text',
  video: 'film',
};

const ResourcesPost = ({ data }: ResourcesPostProps) => {
  const { trackEvent } = useTracker();
  const [didImageLoad, setDidImageLoad] = useState(true);

  const imageOnLoadHandler = (
    event: SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setDidImageLoad(true);
  };
  //do stuff on image fail to load
  const onError = () => setDidImageLoad(false);

  // Function for copying link to post to user's clipboard
  function copyLink(e: any) {
    e.preventDefault();
    navigator.clipboard.writeText(data.url);
    trackEvent({ category: 'Resources Page', action: 'Copy Link' });
  }

  // Function for copying image of post to user's clipboard
  // so this requires some CORS secure header, did not work when using ngrok. idk if it will work on prod
  async function copyImage(e: any, file: string) {
    e.preventDefault();
    try {
      const response = await fetch(file);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      console.log('Image copied.');
    } catch (err: any) {
      console.error(err.name, err.message);
    }
    trackEvent({ category: 'Resources Page', action: 'Copy Image' });
  }

  //truncate string
  const truncate = (input: string, length: number) => {
    if (input)
      return input.length > 5 ? `${input.substring(0, length)}...` : input;
    else return '[no content]';
  };

  return (
    <article className="p-4  w-[400px] h-fit flex flex-col justify-between rounded-xs border border-slate-300 drop-shadow-lg bg-white">
      <div className="flex flex-col gap-y-2">
        <a
          href={data.url}
          aria-label={data.name}
          rel="noreferrer"
          target="_blank"
          className={` bg-slate-50 h-[30vh] relative rounded-2xs overflow-hidden  flex items-center group`}
        >
          {didImageLoad ? (
            <>
              <div
                className={`absolute left-0 top-0 w-full h-full bg-cover bg-center blur opacity-75`}
                style={{
                  backgroundImage: `url('${didImageLoad && data.imageurl})`,
                }}
              />
              <img
                className="relative w-full  text-xs  "
                src={data.imageurl}
                loading="lazy"
                alt={data.name}
                onError={onError}
                onLoad={imageOnLoadHandler}
              />
            </>
          ) : (
            <div className="flex flex-col justify-center gap-y-3 items-center w-full  font-medium text-slate-600">
              <Icon type={typeToIcon[data.type]} size="md" />

              <p className="w-2/3 text-center text-sm">{data.name}</p>
            </div>
          )}
          <div
            aria-hidden
            className="opacity-0 group-hover:opacity-100 absolute left-0 top-0 bg-black/50 w-full h-full flex justify-center items-center"
          >
            <p className="text-slate-100 font-medium flex gap-x-2 items-center bg-slate-700 rounded-xs pl-4 pr-2 py-0.5">
              Open Link in new Tab
              <span>
                <Icon type="external-link" size="sm" />
              </span>
            </p>
          </div>
        </a>
        <AuthorInfo name={data.author} topics={data.topics} />
        <div className="">
          <p className="font-bold text-xl leading-8">
            {data.name ? data.name : '[no title]'}
          </p>
          <p className="text-sm text-slate-600 line-clamp-4 mt-2">
            {data.desc ? data.desc : truncate(data.content, 800)}
          </p>
        </div>
      </div>

      <div className="flex text-xs pt-6 pb-4 justify-between">
        <div className="flex gap-x-1">
          <Button variant="primary" size="md" onClick={copyLink}>
            Copy Link
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={(e: any) => copyImage(e, data.imageurl)}
          >
            Copy Image
          </Button>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => window.open(data.url, '_blank')}
        >
          Open Link
        </Button>
      </div>
    </article>
  );
};

export default ResourcesPost;
