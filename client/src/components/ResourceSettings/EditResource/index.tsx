import Button from 'components/Button';
import {
  fetchResources,
  deleteResource,
  fetchResourceFromPage,
} from 'api/resource';
import notify from 'util/notify';
import { useEffect, useState, useMemo } from 'react';

import c from './index.module.css';
import PopupModal from 'components/PopupModal';
import Icon from 'components/Icon';
interface EditResourceProps {
  onEditOpen: any;
  setActiveResource: any;
}
const EditResource = ({ onEditOpen, setActiveResource }: EditResourceProps) => {
  const [resources, setResources] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState<
    'loading' | 'success' | 'fail'
  >('loading');
  const [page, setPage] = useState(0);

  useEffect(() => {
    apiCall(page);
  }, []);

  useEffect(() => {
    apiCall(page);
  }, [page]);

  async function apiCall(pageNum: number) {
    let apiResponse: any;
    setLoadingState('loading');
    try {
      apiResponse = await fetchResourceFromPage(pageNum);
      if (apiResponse && apiResponse.length > 0) {
        setResources(apiResponse);
        setLoadingState('success');
      } else {
        setLoadingState('fail');
      }
    } catch (error) {
      console.log(error);
      setLoadingState('fail');
    }
  }

  function editResource(resource: Object) {
    setActiveResource(resource);
    onEditOpen(true);
  }
  function onDelete(url: string) {
    const newResources = [...resources];
    const index = resources.findIndex((resource) => resource.url === url);
    newResources.splice(index, 1);
    const resourceUrl = {
      url: url,
    };
    deleteResource(resourceUrl);
    setResources(newResources);
  }
  // function onEdit(url: string) {
  //   const newResources = [...resources];
  //   const index = resources.findIndex((resource) => resource.url === url);
  //   onEditOpen(true);
  // }
  function onChangePage(toPage: number) {
    if (toPage < 0) toPage = 0;
    setPage(toPage);
  }
  function prettyUrl(url: string) {
    try {
      let domain = new URL(url);
      return domain.hostname;
    } catch (e) {
      console.log(e);
    }
    return url;
  }
  return (
    <div className={`flex-1 overflow-hidden flex flex-col`}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium mb-2">Modify Existing Resource</h3>
        <div></div>
      </div>
      <div className="bg-slate-200 rounded-xs w-full flex justify-between items-center px-3 py-3">
        <p>select all</p>
        <div className="text-sm gap-x-2 flex ">
          <Button onClick={() => onChangePage(page - 1)} size="md">
            Prev Page
          </Button>
          <p className="px-3 py-1 rounded-xs bg-slate-100">{page + 1}</p>
          <Button onClick={() => onChangePage(page + 1)} size="md">
            Next Page
          </Button>
        </div>
      </div>
      {loadingState === 'success' ? (
        <ul className="flex-1 overflow-overlay hoverscroll divide-y divide-slate-300 font-medium">
          {resources &&
            resources.map((resource, index) => (
              <li key={index} className="py-4 px-4  ">
                <div className="flex justify-between items-center">
                  <a
                    href={resource.url}
                    className="decoration-underline hover:text-blue-800"
                  >
                    <p className="">{resource.name}</p>
                  </a>
                  <p className="px-2 bg-slate-100 rounded-xs text-sm w-fit mb-3 text-slate-800">
                    {resource.type}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-x-2 text-sm items-center">
                    <p className="px-4 py-1 bg-slate-100 rounded-xs text-slate-800">
                      {resource.author}
                    </p>
                    <p className="text-slate-600">{prettyUrl(resource.url)}</p>
                  </div>
                  <div className="flex gap-x-2 text-sm">
                    <Button onClick={() => editResource(resource)} size="md">
                      Edit
                    </Button>
                    <Button onClick={() => onDelete(resource.url)} size="md">
                      Delete
                    </Button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          {loadingState === 'loading'
            ? 'Loading...'
            : 'failed to load resources'}
        </div>
      )}
    </div>
  );
};

export default EditResource;
