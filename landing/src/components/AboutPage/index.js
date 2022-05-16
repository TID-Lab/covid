import './index.css'
import LandingFooter from '../LandingFooter';
const AboutPage = (props) => {
  return (<div className='AboutPage'>
      <div className='AboutSection'>
      <h1 className="AboutPageTitle"> Additional Information </h1>
      <h1 className="AboutTitle"> Georgia Country Comparison Dashboard </h1>
      <h2 className="DataSource"> Data Sources </h2>
      <ul>
        <li> <a href="https://dph.georgia.gov/covid-19-daily-status-report" target='_blank' rel='noopener noreferrer'> COVID outcomes data (cases, hospitalizations, deaths, testing and related data) from the Georgia Department of Public Health Daily Status Report</a> </li>
        <li> <a href="https://www.census.gov/acs/www/data/data-tables-and-tools/data-profiles/" target='_blank' rel='noopener noreferrer'> Census demographic information (population, race, ethnicity, age distribution) from the American Community Survey 2019 5-Year Estimate by the United States Census Bureau </a> </li>
      </ul>
      {/* <h2 className="DataSource"> Other Information </h2>
      <ul>
        <li> <a href="google.com" target='_blank' rel='noopener noreferrer'> Privacy Policy </a> </li>
        <li> <a href="google.com"> Terms and Conditions </a> </li>
      </ul> */}
      <h1 className="AboutTitle"> Social Media Monitoring Dashboard </h1>
            <h2 className="DataSource"> Data Sources </h2>
      <ul>
        <li> <a href="https://developer.twitter.com/en/docs/twitter-api" target='_blank' rel='noopener noreferrer'> Twitter Public API </a> </li>
        <li> <a href="https://www.crowdtangle.com/"> Crowdtangle for Instagram and Facebook posts </a> </li>
      </ul>
      <h2 className="DataSource"> Usage Information </h2>
      <ul>
        <li> <a href="https://peach.ipat.gatech.edu/dashboard/privacy-policy"  target='_blank' rel='noopener noreferrer'> Privacy Policy </a> </li>
        <li> <a href="https://peach.ipat.gatech.edu/dashboard/terms"  target='_blank' rel='noopener noreferrer'> Terms and Conditions </a> </li>
      </ul>
      <h1 className="AboutTitle"> Georgia Capacity Modeling Dashboard </h1>
      <h2 className="DataSource"> Data Sources </h2>
      <ul>
        <li> <a href="https://www.census.gov/acs/www/data/data-tables-and-tools/data-profiles/"> Demographic data from the Census Bureau 2019 ACS 5-year Survey </a> </li>
        {/* <li> <a href="google.com"> SVI data: From the CDC (based on 2018 ACS 5-year Survey) </a> </li> */}
      </ul>
      {/* <h2 className="DataSource"> Other Information </h2>
      <ul>
        <li> <a href="google.com"> Privacy Policy </a> </li>
        <li> <a href="google.com"> Terms and Conditions </a> </li>
      </ul> */}
      </div>
      <LandingFooter></LandingFooter>
      </div>
      
      )
}
export default AboutPage;