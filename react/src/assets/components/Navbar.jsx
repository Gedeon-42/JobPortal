import { FaBell, FaEnvelope, FaJoomla, FaSearch } from "react-icons/fa";
const Navbar = ()=>{
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
            <img src="" alt="" srcset="" />
        </div>
    </div>
</div>
}
export default Navbar