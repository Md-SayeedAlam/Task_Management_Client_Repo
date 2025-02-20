
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const {user,signOutUser} = useContext(AuthContext)



  const list = (
    <>
      {" "}
      <li>
        <a>Item 1</a>
      </li>
      <li>
        <Link to='/taskPage'>Item 3</Link>
      </li>
    </>
  );


  const handleSignOut = ()=>{
    signOutUser()
    toast.success('Logout successful' ,{position: "top-center",
      autoClose: 2000,})
  }







  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {list}
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost text-xl">Task</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
         {list}
        </ul>
      </div>
      <div className="navbar-end">
        {
          user? <><Link ><button onClick={handleSignOut} className="btn">LogOut</button></Link></>  : <><Link to='/login'><button className="btn">Login</button></Link></>
        }
      </div>
    </div>
  );
};

export default Navbar;
