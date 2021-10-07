import './index.css';

const TeamMember = (props) => {
  return (
      <span className='TeamMemberBlurb'>
        <img src={props.imgLink} alt={props.alt}></img>
        <h1> {props.name}</h1>
        <h2> {props.desc}</h2>
        <a href={props.websiteUrl} target='_blank' rel='noopener noreferrer'> Website </a>
        {/* <div style={{textAlign:'left', marginLeft:'0.5em'}}>  
          <h3 style={{fontSize:'80%', margin: '0px'}}>Project </h3>
          <b className='bold' style={{position:'relative', top:'-5px'}}>PEACH</b>
          <div style={{fontSize:'60%', width:'200px'}}>Promoting Engagement for COVID-19 Testing for Health</div>
        </div> */}
      </span>
  );
};

export default TeamMember;