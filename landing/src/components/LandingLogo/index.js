import { Link } from 'react-router-dom';

import './index.css';

const LandingLogo = () => {
  return (
    <Link to='/'>
      <span className='LandingLogo'>
        <img src='/images/gatech-logo.png' alt='Georgia Tech Logo'></img>
        <div style={{textAlign:'left', marginLeft:'0.5em'}}>  
          <h3 style={{margin:'0px'}}>Institute for People and Technology</h3>
        </div>
      </span>
    </Link>
  );
};

export default LandingLogo;