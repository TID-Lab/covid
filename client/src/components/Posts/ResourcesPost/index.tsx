import Button from 'components/Button';
import { ResourceSchema } from 'reducers/resources';
import AuthorInfo from '../AuthorInfo';

interface ResourcesPostProps {
  data: ResourceSchema;
}
const truncate = (input: string, length: number) =>
  input.length > 5 ? `${input.substring(0, length)}...` : input;
const ResourcesPost = ({ data }: ResourcesPostProps) => {
  return (
    <article className="p-4  w-[400px] h-fit flex flex-col justify-between rounded-xs border border-slate-300 drop-shadow-lg bg-white">
      <div className="flex flex-col gap-y-2">
        <div
          className={` bg-slate-50 h-[30vh] relative rounded-2xs overflow-hidden  flex items-center`}
        >
          <div
            className={`absolute left-0 top-0 w-full h-full bg-cover bg-center blur z-10`}
            style={{
              backgroundImage: `url('${data.imageurl && data.imageurl})`,
            }}
          />
          <img
            className="relative w-full rounded-2xs text-xs  z-40"
            src={data.imageurl}
            loading="lazy"
            alt={data.desc}
          />
        </div>
        <AuthorInfo name={data.author} topics={data.topics} />
        <div className="">
          <p className="font-bold text-xl line-clamp-2 leading-8">
            {data.name ? data.name : '[no title]'}
          </p>
          <p className="text-sm text-slate-600 line-clamp-6 mt-2">
            {data.content ? truncate(data.content, 800) : '[no content]'}
          </p>
        </div>
      </div>

      <div className="flex text-xs pt-6 pb-4 justify-between">
        <div className="flex gap-x-1">
          <Button variant="primary" size="md">
            Copy link
          </Button>
          <Button variant="primary" size="md">
            Copy text
          </Button>
        </div>
        <Button variant="primary" size="md">
          Open Link
        </Button>
      </div>
    </article>
  );
};

export default ResourcesPost;
