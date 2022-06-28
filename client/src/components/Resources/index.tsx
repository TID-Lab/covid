// @ts-nocheck
// This file brings together all the resources
import { useAppSelector } from 'hooks/useTypedRedux';
import { page, lastPage } from '../../api/resource';

import './index.css';

//import Post from '../Post';
//import PrevPageButton from '../PrevPageButton';
//import NextPageButton from '../NextPageButton';

// Need to import and use Resource
// Need to import and use prevPageButton for Resource
// Need to import and use nextPageButton for Resource

const Resources = () => {
  const posts = useAppSelector((state) => state.posts);

  return <div className="Resources" id="Resources"></div>;
};

export default Resources;
