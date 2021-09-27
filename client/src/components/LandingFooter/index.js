// import { useLocation } from 'react-router-dom';

import './index.css';

const LandingFooter = () => {
  return (
    <div className='Credits'>
    <h1> Designed by </h1>
      <div className='CreditImages'>
        <img src='/images/chhs_logo_trans.png' alt='Health and Humanitarian Systems'></img>
        <img src='/images/projectpeachtext.png' alt='Project Peach Logo'></img>
        <img src='/images/ipat-logo-blue.png' alt='Institute for People and Technology Logo'></img>
        <img src='/images/tidlogo.png' alt='Technology  Logo'></img>
      </div>
    </div>
  )
}

export default LandingFooter;