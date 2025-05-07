import { useStateContext } from "../../context/ContextProvider"
import { Navigate, Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Menu from "./Menu"
import { useEffect } from "react"
import axiosClient from "../../axiosClient"
const DefaultLayout = ()=>{

 
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