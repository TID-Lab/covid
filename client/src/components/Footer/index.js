// import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './index.css';

const Footer = () => {
  return (
    <div className='PageFooter'>
      <Link to='/privacy-policy'>Privacy Policy</Link>
      &nbsp; &middot; &nbsp;
      <Link to='/terms'>Terms of Service</Link>
      &nbsp; &middot; &nbsp;
      <Link to='/data-deletion'>Data Deletion</Link>
    </div>
  )
}

export default Footer;