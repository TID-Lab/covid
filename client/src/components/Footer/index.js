// import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './index.css';

const Footer = () => {
  return (
    <div className='PageFooter'>
      <Link to='/social-media-dashboard/privacy-policy'>Privacy Policy</Link>
      &nbsp; &middot; &nbsp;
      <Link to='/social-media-dashboard/terms'>Terms of Service</Link>
      &nbsp; &middot; &nbsp;
      <Link to='/social-media-dashboard/data-deletion'>Data Deletion</Link>
    </div>
  )
}

export default Footer;