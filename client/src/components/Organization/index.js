import './index.css';

import notify from '../../util/notify';
import { deleteOrganization } from '../../api/org';

const Organization = (props) => {
  const { _id, name, role, onDelete } = props;

  async function deleteOrg() {
    const success = await deleteOrganization(_id);
    if (!success) {
      notify('An error occurred.');
      return;
    }
    onDelete(_id);
  }
  
  return (
    <div className='Row Organization'>
      <div>
        <span>{role}</span>
        {name}
      </div>
      <div>
        <button onClick={deleteOrg}>Delete</button>
      </div>
    </div>
  );
};

export default Organization;