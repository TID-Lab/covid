import Button from 'components/Button';
import { ResourceSchema } from 'reducers/resources';
import AuthorInfo from '../AuthorInfo';
import useTracker from 'hooks/useTracker';
import { SyntheticEvent, useState } from 'react';
import Icon, { iconType } from 'components/Icon';
interface ResourcesPostProps {
  index: number;
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
              {!data.isScreenshotLoaded && (
                <div className="absolute z-10 px-4 py-1 text-xs font-bold text-white bg-black rounded-md left-1 top-1">
                  <h4>Trying to load recent screenshot</h4>
                </div>
              )}
              <img
                className="relative w-full text-xs "
                src={
                  data.isScreenshotLoaded
                    ? `data:image/jpeg;base64, ${data.screenshotImageBase64}`
                    : data.imageurl
                }
                loading="lazy"
                alt={data.name}
                onError={onError}
                onLoad={imageOnLoadHandler}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full font-medium gap-y-3 text-slate-600">
              <Icon type={typeToIcon[data.type]} size="md" />

              <p className="w-2/3 text-sm text-center">{data.name}</p>
            </div>
          )}
          <div
            aria-hidden
            className="absolute top-0 left-0 flex items-center justify-center w-full h-full opacity-0 group-hover:opacity-100 bg-black/50"
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
          <p className="text-xl font-bold leading-8">
            {data.name ? data.name : '[no title]'}
          </p>
          <p className="mt-2 text-sm text-slate-600 line-clamp-4">
            {data.desc ? data.desc : truncate(data.content, 800)}
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-6 pb-4 text-xs">
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
