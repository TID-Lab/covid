import Icon from 'components/Icon';
import {
  COVID_TOPICS,
  ACC_CATEGORIES,
  INSTITUTION,
  IDENTITIES,
} from 'util/filterData';

//  tags , combine account type, and identities
const TAGS = { ...INSTITUTION, ...IDENTITIES };

interface AuthorInfoProps {
  name: string;
  accType?: Array<keyof typeof INSTITUTION | keyof typeof IDENTITIES>;
  accCategories?: Array<keyof typeof ACC_CATEGORIES>;
  topics?: Array<keyof typeof COVID_TOPICS>;
}
const AuthorInfo = ({
  name,
  accType,
  accCategories,
  topics,
}: AuthorInfoProps) => {
  function format(tag: keyof typeof ACC_CATEGORIES) {}

  return (
    <div className="grid grid-cols-2 gap-x-2 font-medium">
      <div className="flex gap-x-2  gap-y-2">
        <div className="rounded-full  flex-grow  min-w-[2rem] max-w-[2rem] w-[2rem] h-[2rem] flex justify-center  items-center bg-slate-600 text-slate-100">
          <p className="text-base  ">{name && name[0].toUpperCase()}</p>
        </div>
        <div className="">
          <div className="text-xs">
            {accCategories ? (
              accCategories
                .map((tag, index) => (
                  <p
                    key={index}
                    className="px-4 py-[4px] rounded-full bg-slate-200 "
                  >
                    {ACC_CATEGORIES[tag]}
                  </p>
                ))
                .filter(Boolean)
            ) : (
              <div className="pt-2" />
            )}
          </div>
          <p className="text-sm font-bold leading-4">{name}</p>
          <div className="text-xs flex flex-wrap gap-x-0.5 gap-y-1">
            {accCategories &&
              accCategories
                .map((tag, index) => (
                  <p
                    key={index}
                    className="px-4 py-0.5 rounded-full bg-slate-200 "
                  >
                    {ACC_CATEGORIES[tag]}
                  </p>
                ))
                .filter(Boolean)}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-0.5 gap-y-1 text-xs h-fit">
        {topics &&
          topics
            .map((topic, index) => (
              <p
                key={index}
                className="px-4 py-0.5 rounded-full bg-slate-100 flex gap-x-0.5 items-center text-slate-700"
              >
                <Icon type="tag" size="2xs" />
                {COVID_TOPICS[topic]}
              </p>
            ))
            .filter(Boolean)}
      </div>
    </div>
  );
};

export default AuthorInfo;
