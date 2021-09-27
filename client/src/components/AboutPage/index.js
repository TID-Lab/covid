import './index.css'
import LandingFooter from '../LandingFooter';
const AboutPage = (props) => {
  return (<div className='AboutPage'> 
      <h1 className="AboutTitle"> Georgia Country Comparison Dashboard </h1>
      <h2 className="DataSource"> Data sources </h2>
      <ul>
        <li> <a href="google.com"> Data Source 1 </a> </li>
        <li> <a href="google.com"> Data Source 2 </a> </li>
      </ul>
      <h2 className="DataSource"> Privacy Policy </h2>
      <ul>
        <li> <a href="google.com"> Privacy Policy </a> </li>
        <li> <a href="google.com"> Terms and Conditions </a> </li>
      </ul>
      <h1 className="AboutTitle"> Social Media Monitoring Dashboard </h1>
      <h2 className="DataSource"> Data sources </h2>
      <ul>
        <li> <a href="google.com"> Data Source 1 </a> </li>
        <li> <a href="google.com"> Data Source 2 </a> </li>
      </ul>
      <h2 className="DataSource"> Privacy Policy </h2>
      <ul>
        <li> <a href="google.com"> Privacy Policy </a> </li>
        <li> <a href="google.com"> Terms and Conditions </a> </li>
      </ul>
      <h1 className="AboutTitle"> Georgia Capacity Modeling Dashboard </h1>
      <h2 className="DataSource"> Data sources </h2>
      <ul>
        <li> <a href="google.com"> Data Source 1 </a> </li>
        <li> <a href="google.com"> Data Source 2 </a> </li>
      </ul>
      <h2 className="DataSource"> Privacy Policy </h2>
      <ul>
        <li> <a href="google.com"> Privacy Policy </a> </li>
        <li> <a href="google.com"> Terms and Conditions </a> </li>
      </ul>
      
      <LandingFooter></LandingFooter>
      </div>
      
      )
}
export default AboutPage;