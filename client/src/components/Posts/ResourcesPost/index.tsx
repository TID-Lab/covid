import Button from 'components/Button';
import { ResourceSchema } from 'reducers/resources';

interface ResourcesPostProps {
  data: ResourceSchema;
}

const ResourcesPost = ({ data }: ResourcesPostProps) => {
  return (
    <article className="p-4 min-h-[50vh] w-[400px] flex flex-col justify-between rounded-xs border border-slate-300 drop-shadow-lg bg-white">
      <div className="">
        <div className=" bg-slate-50 h-[30vh] rounded-2xs">
          <img
            className="w-full rounded-2xs text-xs  "
            src={data.imageurl}
            loading="lazy"
            alt={data.content}
          />
        </div>
        <div className="">
          <p className="font-bold text-xl">
            {data.desc ? data.desc : '[no title]'}
          </p>
          <p className="text-sm text-slate-600">{data.content}</p>
        </div>
      </div>

      <div className="flex text-xs gap-x-1 pb-4">
        <Button variant="primary" size="md">
          Copy link
        </Button>
        <Button variant="primary" size="md">
          Copy text
        </Button>
      </div>
    </article>
  );
};

export default ResourcesPost;
