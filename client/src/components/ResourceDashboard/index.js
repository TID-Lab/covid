import './index.css';

//import Filters from '../Filters';
import Posts from '../Posts'; // We will not be using this. It is just here for example purposes.
import useAuth from '../../hooks/auth';
// Need to import resources
// Need to import Filters for Resources

// This is the resources dashboard and it assembles the resource posts and filters associated with it.

const ResourceDashboard = () => {
  useAuth();

  return (
    <div className="ResourceDashboard">
      <Posts/>
    </div>
  )
}

export default ResourceDashboard;