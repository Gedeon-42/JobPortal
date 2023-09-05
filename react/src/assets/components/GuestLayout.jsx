import { useStateContext } from "../../context/ContextProvider"
import { Navigate, Outlet } from "react-router-dom"
const GuestLayout = ()=>{
    const{token}=useStateContext()
    if(token){
        return <Navigate to='/'/>
    }
    return (
        <div>
            <p>Guest layout</p>
            <Outlet/>
        </div>
    )
}
export default GuestLayout