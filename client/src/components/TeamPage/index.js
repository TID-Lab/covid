import './index.css'
import TeamMember from '../TeamMember';
import LandingFooter from '../LandingFooter';
const TeamPage = (props) => {
  return (<div className='TeamPage'> 
      <div className='Leadership'>
          <h1 className='TeamTitle'> Faculty </h1>
          <div className='TeamMembers'>
          <TeamMember imgLink='/images/mike_best.png' alt='Mike' name='Michael L. Best' desc='Dr. Michael L. Best is Professor with the Sam Nunn School of International Affairs and the School of Interactive Computing at Georgia Institute of Technology where he directs the Technologies and International Development Lab. ' websiteUrl='http://tid.gatech.edu/'> </TeamMember>
          <TeamMember imgLink='/images/projectpeach.png' alt='proj' name='Sample Name' desc='This is a 2 liner description about work, 
          background, position or anything else etc.' websiteUrl='http://tid.gatech.edu/'> </TeamMember>
          <TeamMember imgLink='/images/projectpeach.png' alt='proj' name='Sample Name' desc='This is a 2 liner description about work, 
          background, position or anything else etc.' websiteUrl='http://tid.gatech.edu/'> </TeamMember>
          </div>
        </div>
      <div className='TeamMemberSection'>
        <h1 className='TeamTitle'> Students </h1>
        <div className='TeamMembers'> 
          <TeamMember imgLink='/images/amy_chen.jpeg' alt='Amy' name='Amy Chen' desc='PhD student working with the T+ID Lab to develop the Social Media Dashboard.
          She is currently interested in questions surrounding the creation of, access to, and use of data for public benefit in underrepresented contexts.' websiteUrl='http://tid.gatech.edu/'> </TeamMember>
          <TeamMember imgLink='/images/phoebe_tan.jpg' alt='Phoebe' name='Phoebe Tan' desc='MS-Human-Computer Interaction student collaborating 
          with Emory and community partners around Georgia to identify and mitigate health disparity issues with testings, vaccines, and information related to COVID-19.' websiteUrl='https://www.phoebetan.com/'> </TeamMember>
          <TeamMember imgLink='/images/andrew_zhao.jpg' alt='Andrew' name='Andrew Zhao' desc='Undergraduate developer working with the T+ID Lab on the Social Media Dashboard. 
          His work aims to help Georgia community partners mitigate Covid-19 spread through tools that help understand and respond to Covid-19 misinformation on social media.' websiteUrl='https://github.com/steveand117/'> </TeamMember>
          <TeamMember imgLink='/images/projectpeach.png' alt='proj' name='Sample Name' desc='This is a 2 liner description about work, 
          background, position or anything else etc.' websiteUrl='http://tid.gatech.edu/'> </TeamMember>
          <TeamMember imgLink='/images/projectpeach.png' alt='proj' name='Sample Name' desc='This is a 2 liner description about work, 
          background, position or anything else etc.' websiteUrl='http://tid.gatech.edu/'> </TeamMember>
          <TeamMember imgLink='/images/projectpeach.png' alt='proj' name='Sample Name' desc='This is a 2 liner description about work, 
          background, position or anything else etc.' websiteUrl='http://tid.gatech.edu/'> </TeamMember>
          <TeamMember imgLink='/images/projectpeach.png' alt='proj' name='Sample Name' desc='This is a 2 liner description about work, 
          background, position or anything else etc.' websiteUrl='http://tid.gatech.edu/'> </TeamMember>
          <TeamMember imgLink='/images/projectpeach.png' alt='proj' name='Sample Name' desc='This is a 2 liner description about work, 
          background, position or anything else etc.' websiteUrl='http://tid.gatech.edu/'> </TeamMember>
          </div>
          
      </div>
      
      <LandingFooter></LandingFooter>
      </div>
      )
}
export default TeamPage;