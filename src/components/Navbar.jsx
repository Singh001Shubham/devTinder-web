import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from 'react-router';
import { removeUser } from '../utils/userSlice';



function Navbar(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async(e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:3000/logout",{},{withCredentials:true})
      dispatch(removeUser());
      navigate("/login")
    }catch(err){
      console.log("Error : "+err.message)
    }
  }
  const User = useSelector((store) => store.user);
  console.log({User})
    return (
        <>
                <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  <div className="flex-none">
    
   {User && ( <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={User.photo_url} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            
          </Link>
        </li>
        <li>
          <Link to="/connections" className="justify-between">
            connections
            
          </Link>
        </li>
        <li>
          <Link to="/requests" className="justify-between">
            requests
            
          </Link>
        </li>
        
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
     
    </div>
     )}
  </div>
</div>
        </>
    )
}

export default Navbar