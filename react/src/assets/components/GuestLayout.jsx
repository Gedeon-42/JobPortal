import { useStateContext } from "../../context/ContextProvider"
import { Navigate, Outlet } from "react-router-dom"
const GuestLayout = ()=>{
   
    return (
        <div className="outlet">
            
            <Outlet/>
        </div>
    )
}

export default GuestLayout