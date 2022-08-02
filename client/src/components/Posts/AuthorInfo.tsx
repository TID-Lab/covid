import Icon from 'components/Icon';
import {
  COVID_TOPICS,
  ACC_CATEGORIES,
  INSTITUTION,
  IDENTITIES,
} from 'util/filterData';

//  tags , combine account type, and identities
const TAGS = { ...INSTITUTION, ...IDENTITIES } as any;

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
      <div className="flex gap-x-2  gap-y-2 items-center">
        <div className="rounded-full  flex-grow  min-w-[2rem] max-w-[2rem] w-[2rem] h-[2rem] flex justify-center  items-center bg-slate-600 text-slate-100">
          <p className="text-base  ">{name && name[0].toUpperCase()}</p>
        </div>
        <div className="">
          <div className="text-xs flex gap-x-0.5 gap-y-1 flex-wrap">
            <p className="text-slate-500 font-medium ">
              {accCategories ? (
                accCategories
                  .map(
                    (tag, index) =>
                      TAGS[tag] && (
                        <>
                          <span key={index} className="inline-block">
                            {TAGS[tag]}
                          </span>
                          <span className="last:hidden">{', '}</span>
                        </>
                      )
                  )
                  .filter(Boolean)
              ) : (
                <span className="pt-2" />
              )}
            </p>
          </div>
          <p className="text-sm font-bold leading-4">{name}</p>
          <div className="text-xs flex flex-wrap gap-x-0.5 gap-y-1">
            {accCategories &&
              accCategories
                .map(
                  (tag, index) =>
                    ACC_CATEGORIES[tag] && (
                      <p key={index} className="px-4 py-0.5  ">
                        {ACC_CATEGORIES[tag]}
                      </p>
                    )
                )
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
