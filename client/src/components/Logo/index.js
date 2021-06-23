import './index.css';

const Logo = () => {
  return (
    <a href='https://www.projectpeach.org/' target='_blank' rel='noopener noreferrer'>
      <div className='Logo'>
        <img src='/images/projectpeach.png' alt='Project Peach'></img>
        <h3>Project <b className='bold'>PEACH</b></h3>
      </div>
    </a>
  );
};

export default Logo;