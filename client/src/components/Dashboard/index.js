import './index.css';

import Filters from '../Filters';
import Posts from '../Posts';
import useAuth from '../../hooks/auth';

const Dashboard = () => {
  useAuth();

  return (
    <div className='Dashboard'>
      <Filters />
      <Posts />
    </div>
  )
}

export default Dashboard;