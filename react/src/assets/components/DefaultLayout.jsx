import { useStateContext } from "../../context/ContextProvider"
import { Navigate, Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Menu from "./Menu"
const DefaultLayout = ()=>{

    const{user,token} = useStateContext()
    if(!token){
        return <Navigate to='/login'/>
    }
    return (
        <div className="main">
            
            <Navbar/>
            <div className="container">
        <div className="menuContainer">
            <Menu/>
        </div>
        <div className="contentContainer">
        <Outlet/>
        </div>
            </div>
           
            <Footer/>
        </div>
    )
}
export default DefaultLayout