const Logo = () => {
  return (
    <span className={` px-2 py-1 flex items-center space-x-2 font-bold`}>
      <img
        className="h-[40px]"
        src="/images/projectpeach.png"
        alt="Project Peach"
      ></img>
      <h3>
        Project <span className="">PEACH</span>
      </h3>
    </span>
  );
};

export default Logo;
