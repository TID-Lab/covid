

import './index.css';

const TextLogo = () => {
  return (
      <span className='TextLogo'>
        <img src='/images/projectpeach.png' alt='Project Peach'></img>
        
        <img src='/images/projectpeachwhitetext.png' alt='Project Peach White Text'></img>
        {/* <div style={{textAlign:'left', marginLeft:'0.5em'}}>  
          <h3 style={{fontSize:'80%', margin: '0px'}}>Project </h3>
          <b className='bold' style={{position:'relative', top:'-5px'}}>PEACH</b>
          <div style={{fontSize:'60%', width:'200px'}}>Promoting Engagement for COVID-19 Testing for Health</div>
        </div> */}
      </span>
  );
};

export default TextLogo;