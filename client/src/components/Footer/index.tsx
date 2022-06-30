// @ts-nocheck
// import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import c from './index.module.css';

const Footer = () => {
  return (
    <div className="flex self-end bg-white flex-row px-4 rounded-tl text-sm ">
      <Link to="/privacy-policy">Privacy Policy</Link>
      &nbsp; &middot; &nbsp;
      <Link to="/terms">Terms of Service</Link>
      &nbsp; &middot; &nbsp;
      <Link to="/data-deletion">Data Deletion</Link>
    </div>
  );
};

export default Footer;
