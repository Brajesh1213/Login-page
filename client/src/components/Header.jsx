import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-slate-200 p-auto m-2">
      <div className="flex flex-col lg:flex-row justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-2xl lg:text-3xl">Auth page</h1>
        </Link>
        <ul className="flex gap-4 cursor-pointer mt-4 lg:mt-0">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>

          <Link to='/profile'>
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className=" h-7 w-7  rounded-full"/>
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
