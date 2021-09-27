import './index.css'
import TeamMember from '../TeamMember';
const TeamPage = (props) => {
  return (<div className='TeamPage'> 
      <div className='Leadership'>
          <h1 className='TeamTitle'> Leadership </h1>
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
        <h1 className='TeamTitle'> The Team </h1>
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
      <div className='Credits'>
        <h1> Designed by </h1>
          <div className='CreditImages'>
            <img src='/images/chhs_logo_trans.png' alt='Health and Humanitarian Systems'></img>
            <img src='/images/projectpeachtext.png' alt='Project Peach Logo'></img>
            <img src='/images/ipat-logo-blue.png' alt='Institute for People and Technology Logo'></img>
            <img style={{width:"10rem"}} src='/images/tidlogo.png' alt='Technology  Logo'></img>
          </div>
        </div>
      </div>
      )
}
export default TeamPage;