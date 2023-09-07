import { FaBell, FaEnvelope, FaJoomla, FaSearch } from "react-icons/fa";
import axiosClient from "../../axiosClient";

import { useStateContext } from "../../context/ContextProvider";
import { useEffect } from "react";
const Navbar = ()=>{
    const {user, token, setUser, setToken, notification} = useStateContext()

    const onLogout = ev => {
        ev.preventDefault()
    
        axiosClient .post('/logout')
          .then(() => {
            setUser({})
            setToken(null)
          })
      }

     
return <div className="navbar">
    <div className="logo">
        <FaJoomla/>
        <span>job Portal</span>
    </div>
    <div className="icons">
        <FaSearch/>
        <FaBell/>
        <FaEnvelope/>
        <div className="user">
        <a onClick={onLogout} style={{color:"white",textDecoration:"none"}} className="btn-logout" href="#">Logout</a>
        </div>
    </div>
</div>
}
export default Navbar