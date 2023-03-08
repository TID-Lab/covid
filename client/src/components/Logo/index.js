import { Link } from 'react-router-dom';

import './index.css';

const Logo = () => {
  return (
    // <a href='https://www.projectpeach.org/' target='_blank' rel='noopener noreferrer'>
    <Link to='/'>
      <span className='Logo'>
        <img src='/images/georgiaceal-sq.png' alt='GEORGIA CEAL'></img>
        {/* <img src='/images/projectpeach.png' alt='Project Peach'></img> */}
        <div style={{textAlign:'left', marginLeft:'0.5em'}}>  
          <h3 style={{margin:'0px'}}><b className='bold'>GEORGIA CEAL</b></h3>
          <div style={{fontSize:'80%'}}>Social Media Dashboard</div>
        </div>
      </span>
    </Link>
  );
};

export default Logo;