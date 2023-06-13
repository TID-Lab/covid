import Icon from 'components/Icon';
import { Fragment } from 'react';
import {
  COVID_TOPICS,
  LABELS,
  INSTITUTION,
  IDENTITIES,
} from 'util/filterData';

//  tags , combine account type, and identities
const TAGS = { ...INSTITUTION, ...IDENTITIES } as any;
//colors for customtags
const COLOR_CSS: { [key: string]: string } = {
  red: 'bg-rose-200 border-rose-300',
  green: 'bg-emerald-200 border-emerald-300',
  purple: 'bg-violet-200 border-violet-300',
  blue: 'bg-blue-200 border-blue-300',
  pink: 'bg-pink-200 border-pink-300',
};
interface AuthorInfoProps {
  name: string;
  customTags?: any[];
  labels?: Array<keyof typeof LABELS>;
  topics?: Array<keyof typeof COVID_TOPICS>;
}
const AuthorInfo = ({
  name,
  customTags,
  labels,
  topics,
}: AuthorInfoProps) => {
  
  return (
    <div className=" font-medium space-y-2 ">
      <div className="flex items-center gap-x-2 gap-y-2">
        <div className="rounded-full  flex-grow  min-w-[2rem] max-w-[2rem] w-[2rem] h-[2rem] flex justify-center  items-center bg-slate-600 text-slate-100">
          <p className="text-base ">{name && name[0].toUpperCase()}</p>
        </div>
        <div className="">
          <p className="text-sm font-bold leading-4">{name}</p>
          <div className="text-xs flex flex-wrap gap-x-0.5 gap-y-1">
            {labels &&
              labels
                .filter((label) => label === 'misinfo')
                .map((label, index) => (
                  <span className="text-white flex gap-x-1 bg-red-600 rounded-full py-0.5 pr-3 truncate pl-1 ">
                    <Icon type="alert-octagon" size="xs" />
                    Known Misinformation Spreader
                  </span>
                ))}
          </div>
        </div>
      </div>
      <ul className="flex flex-wrap gap-x-0.5 gap-y-1 text-xs h-fit">
        {labels &&
          (
            labels
            .filter((label) => label !== 'misinfo')
            .map((label, index) => (
              <li
                key={index}
                className="px-4 py-0.5 rounded-full  bg-slate-200 flex gap-x-0.5 items-center text-slate-700"
              >
                {/* <Icon type="tag" size="2xs" /> */}
                {LABELS[label]}
              </li>
          )
          ))}
      </ul>
      <ul className="flex flex-wrap gap-x-0.5 gap-y-1 text-xs h-fit">
        {topics &&
          topics.map((topic, index) => (
            <li
              key={index}
              className="px-4 py-0.5 rounded-full bg-slate-100 flex gap-x-0.5 items-center text-slate-700"
            >
              {/* <Icon type="tag" size="2xs" /> */}
              {COVID_TOPICS[topic]}
            </li>
          ))}
        {customTags &&
          customTags
            .map((tag, index) => (
              <li
                key={index}
                className={`px-4 py-0.5 rounded-full flex gap-x-0.5 items-center text-slate-700 ${
                  COLOR_CSS[tag.color]
                }`}
              >
                {/* <Icon type="tag" size="2xs" /> */}
                {tag.name}
              </li>
            ))
            .filter(Boolean)}
      </ul>
    </div>
  );
};

export default AuthorInfo;
