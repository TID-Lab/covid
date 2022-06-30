// import { useLocation } from 'react-router-dom';

import './index.css';

const LandingFooter = () => {
  return (
    <div className="Credits">
      <h1> Designed by </h1>
      <div className="CreditImages">
        <img
          src="/images/ipat-logo-blue.png"
          alt="Institute for People and Technology Logo"
        ></img>
        <img
          src="/images/chhs_logo_trans.png"
          alt="Health and Humanitarian Systems"
        ></img>
        <a
          href="https://www.projectpeach.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            style={{ height: '5rem', marginTop: '-1rem' }}
            src="/images/projectpeachtext.png"
            alt="Project Peach Logo"
          ></img>
        </a>
        <a
          href="http://tid.gatech.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            style={{ height: '4rem', marginTop: '-.2rem' }}
            src="/images/tidlogo.png"
            alt="Technology  Logo"
          ></img>
        </a>
      </div>
    </div>
  );
};

export default LandingFooter;
