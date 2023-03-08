const Logo = () => {
  return (
    <span
      className={` px-2 py-1 flex items-center space-x-2 text-slate-700 text-md font-bold`}
    >
      <img
        className="h-9"
        src="/images/georgiaceal-sq.png"
        alt="GEORGIA CEAL"
      ></img>
      <h3>
        GEORGIA <span className="">CEAL</span>
      </h3>
    </span>
  );
};

export default Logo;
