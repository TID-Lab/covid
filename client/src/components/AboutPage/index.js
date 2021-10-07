import './index.css'
import LandingFooter from '../LandingFooter';
const AboutPage = (props) => {
  return (<div className='AboutPage'>
      <div className='AboutSection'>
      <h1 className="AboutTitle"> Georgia Country Comparison Dashboard </h1>
      <h2 className="DataSource"> Data Sources </h2>
      <ul>
        <li> <a href="google.com" target='_blank' rel='noopener noreferrer'> Data Source 1 </a> </li>
        <li> <a href="google.com" target='_blank' rel='noopener noreferrer'> Data Source 2 </a> </li>
      </ul>
      <h2 className="DataSource"> Other Information </h2>
      <ul>
        <li> <a href="google.com" target='_blank' rel='noopener noreferrer'> Privacy Policy </a> </li>
        <li> <a href="google.com"> Terms and Conditions </a> </li>
      </ul>
      <h1 className="AboutTitle"> Social Media Monitoring Dashboard </h1>
      <h2 className="DataSource"> Other Information </h2>
      <ul>
        <li> <a href="https://peach.ipat.gatech.edu/social-media-dashboard/privacy-policy"  target='_blank' rel='noopener noreferrer'> Privacy Policy </a> </li>
        <li> <a href="https://peach.ipat.gatech.edu/social-media-dashboard/terms"  target='_blank' rel='noopener noreferrer'> Terms and Conditions </a> </li>
      </ul>
      <h1 className="AboutTitle"> Georgia Capacity Modeling Dashboard </h1>
      <h2 className="DataSource"> Data Sources </h2>
      <ul>
        <li> <a href="google.com"> Data Source 1 </a> </li>
        <li> <a href="google.com"> Data Source 2 </a> </li>
      </ul>
      <h2 className="DataSource"> Other Information </h2>
      <ul>
        <li> <a href="google.com"> Privacy Policy </a> </li>
        <li> <a href="google.com"> Terms and Conditions </a> </li>
      </ul>
      </div>
      <LandingFooter></LandingFooter>
      </div>
      
      )
}
export default AboutPage;