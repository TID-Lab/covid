import './index.css'
import TextLogo from '../TextLogo';
import useAuth from '../../hooks/auth';
import LandingFooter from '../LandingFooter';
// TODO: Separate out into several components
const LandingPage = (props) => {
  useAuth(false, '/')
  return (<div className='LandingPage'> 
      <section className='IntroPage'>
        <div className='TextBlurb'>
          <h1 className='Title'> Fighting Covid-19 in Georgia </h1>
          <h2 className='Body'> The purpose of this project is to increase COVID-19 testing and 
          learn about experiences and opinions regarding COVID-19 testing among minority populations in Georgia. </h2>
          <TextLogo></TextLogo>
          <a id='SeeDashboards' href="#Dashboards">See Dashboards</a>
        </div>
        <div className='CirclePictures'>
          <img src='/images/promo1.png' alt='Women getting vaccine'></img>
          <img style={{marginLeft:'15em', marinBottom: '0rem'}} src='/images/promo2.png' alt='Covid Home Test'></img>
          <img style={{marginLeft:'5rem', position:'relative', left: '2rem', top:'-6rem'}}src='/images/promo3.png' alt='People looking at a phone'></img>
          <img style={{marginLeft:'5rem', position:'relative', left: '-5rem', top:'-10rem'}}src='/images/promo4.png' alt='Elbow highfive'></img>
        </div>
      </section>
      <section className='DashboardPage'>
        <h1> COVID-19 Community Response Dashboards </h1>
        <div className='Dashboards' id='Dashboards'>
          <div className='DashboardBlurb'>
              <img src='/images/countycompare.png' alt='Georgia County Comparison'></img>
              <h1>Georgia County Comparison</h1>
              <h2> This dashboard aggregates COVID-19 related outcomes and demographic data at the county level for comparison. </h2>
              <a href="https://chhs-gt.shinyapps.io/covidcommunitydashboard">See Dashboard</a>
            </div>
            
          <div className='DashboardBlurb'>
              <img src='/images/socialmediamonitor.png' alt='Social Media Monitor'></img>
              <h1>Georgia Social Media Monitoring</h1>
              <h2> This dashboard aggregates COVID-19 related social media posts to effectively target misformation online. </h2>
              <a href="/dashboard">See Dashboard</a>
            </div>
            
          <div className='DashboardBlurb'>
              <img style={{width:'440px', height:'309px'}} src='/images/georgiacapacitymodel.png' alt='Georgia Capacity Model'></img>
              <h1>Georgia Capacity Modeling</h1>
              <h2> This dashboard aggregates testing capacity across various locations in Georgia to optimize deployment of effectively. </h2>
              <a href="https://ipat-health.shinyapps.io/peach-capacity-dashboard/">See Dashboard</a>
            </div>
        </div>
      </section>
      <LandingFooter></LandingFooter>
      </div>
      )
}
export default LandingPage;