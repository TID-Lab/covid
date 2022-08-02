import Button from 'components/Button';
import {
  fetchResources,
  deleteResource,
  fetchResourceFromPage,
} from 'api/resource';
import { useHidePopup, useShowPopup } from 'hooks/popup';
import notify from 'util/notify';
import { useEffect, useState, useMemo } from 'react';
import EditModal from '../EditModal';

import c from './index.module.css';
import PopupModal from 'components/PopupModal';

const EditResource = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Object>();
  const hidePopup = useHidePopup();
  const showPopup = useShowPopup();
  const [page, setPage] = useState(0);

  async function apiCall(pageNum: number) {
    let apiResponse: any;
    try {
      apiResponse = await fetchResourceFromPage(pageNum);
      setResources(apiResponse);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    apiCall(page);
  }, []);

  useEffect(() => {
    apiCall(page);
  }, [page]);

  function editResource(resource: Object) {
    setSelectedResource(resource);
    setShowEditModal(true);
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
  function onEdit(url: string) {
    const newResources = [...resources];
    const index = resources.findIndex((resource) => resource.url === url);
    showCreateModal(newResources[index]);
  }
  function showCreateModal(resource: Object) {
    showPopup(<EditModal resource={resource} />);
  }
  return (
    <div className={`Modal ${c.ResourceModal}`}>
      <h4>Resources</h4>
      <div className="flex w-full justify-end items-center text-sm gap-x-2 ">
        <Button onClick={() => setPage(page - 1)} size="md">
          Prev Page
        </Button>
        <p className="px-3 py-1 rounded-xs bg-slate-100">{page}</p>
        <Button onClick={() => setPage(page + 1)} size="md">
          Next Page
        </Button>
      </div>
      <table className="border-collapse collapse width 100% overflow-x scroll overflow-y scroll">
        <thead>
          <tr>
            <th className="border 1px solid #ffffff text-align left padding 8px font-size 10px">
              Name
            </th>
            <th className="border 1px solid #ffffff text-align left padding 8px font-size 10px">
              Author
            </th>
            <th className="border 1px solid #ffffff text-align left padding 8px font-size 10px">
              Type
            </th>
            <th className="border 1px solid #ffffff text-align left padding 8px font-size 10px">
              URL
            </th>
            <th className="border 1px solid #ffffff text-align left padding 8px font-size 10px">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {resources &&
            resources.map((resource) => (
              <tr>
                <td className="">{resource.name}</td>
                <td className="">{resource.author}</td>
                <td className="">{resource.type}</td>
                <td className="">{resource.url}</td>
                <td className="">
                  <Button onClick={() => editResource(resource)} size="md">
                    Edit
                  </Button>
                  <Button onClick={() => onDelete(resource.url)}>Delete</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <PopupModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        className="w-[400px]"
      >
        <EditModal
          resource={selectedResource}
          onClose={() => setShowEditModal(false)}
        />
      </PopupModal>
    </div>
  );
};

export default EditResource;
