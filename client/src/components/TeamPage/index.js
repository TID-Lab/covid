import './index.css'
import TeamMember from '../TeamMember';
import LandingFooter from '../LandingFooter';
const TeamPage = (props) => {
  return (<div className='TeamPage'> 
      <div className='Leadership'>
          <h1 className='TeamTitle'> Faculty </h1>
          <div className='TeamMembers'>
          <TeamMember imgLink='/images/projectpeach.png' alt='proj' name='Sample Name' desc='This is a 2 liner description about work, 
          background, position or anything else etc.' websiteUrl='http://tid.gatech.edu/'> </TeamMember>
          <TeamMember imgLink='/images/projectpeach.png' alt='proj' name='Sample Name' desc='This is a 2 liner description about work, 
          background, position or anything else etc.' websiteUrl='http://tid.gatech.edu/'> </TeamMember>
          <TeamMember imgLink='/images/projectpeach.png' alt='proj' name='Sample Name' desc='This is a 2 liner description about work, 
          background, position or anything else etc.' websiteUrl='http://tid.gatech.edu/'> </TeamMember>
          </div>
        </div>
      <div className='TeamMemberSection'>
        <h1 className='TeamTitle'> Students </h1>
        <div className='TeamMembers'>
      <TeamMember imgLink='/images/prof_picture.jpg' alt='proj' name='Sample Name' desc='This is a 2 liner description about work, 
          background, position or anything else etc.' websiteUrl='http://tid.gatech.edu/'> </TeamMember>
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