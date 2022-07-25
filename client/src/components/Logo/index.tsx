const Logo = () => {
  return (
    <span
      className={` px-2 py-1 flex items-center space-x-2 text-slate-700 text-md font-bold`}
    >
      <img
        className="h-9"
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
