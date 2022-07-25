
import c from './index.module.css';
import ResourceModal from './ResourceModal';
import Button from 'components/Button';

const ResourceSettings = () => {

  return (
    <div className={c.OrganizationSettings}>
        <ResourceModal/>
        <Button onClick={()=> window.open('/resources', '_self') } className="align justify-center">
        ← Back 
        </Button>
    </div>
  );


}

export default ResourceSettings;