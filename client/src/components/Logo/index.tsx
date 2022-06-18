// @ts-nocheck

import c from './index.module.css';

const Logo = () => {
  return (
    <span className={`${c.Logo} px-2 py-1 flex items-center space-x-2`}>
      <img
        className="h-[40px]"
        src="/images/projectpeach.png"
        alt="Project Peach"
      ></img>
      <div>
        <h3>
          Project <b className="bold">PEACH</b>
        </h3>
      </div>
    </span>
  );
};

export default Logo;
