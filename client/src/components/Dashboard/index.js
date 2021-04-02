import './index.css';

import Filters from '../Filters';
import Posts from '../Posts';

const Dashboard = () => {
  return (
    <div className='Dashboard'>
      <Filters />
      <Posts />
    </div>
  )
}

export default Dashboard;