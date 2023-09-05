import { useRef, useState } from "react"
import axiosClient from "../../axiosClient"
import { useStateContext } from "../../context/ContextProvider"


const Login = ()=>{
const emailRef = useRef()
const passwordRef = useRef()

const [errors,setErrors]=useState(null)

const{setUser,setToken}=useStateContext()
const onSubmit = (ev)=>{
ev.preventDefault()
const payload= {
    email:emailRef.current.value,
    password:passwordRef.current.value
}
setErrors(null)
axiosClient.post('/login',payload).then(({data})=>{
    setUser(data)
setToken(data)
}).catch(err=>{
    const response = err.response
    if(response && response.status === 422){
  console.log(response.data.errors)
  if(response.data.errors){
  setErrors(response.data.errors)
}
else{
    setErrors({
        email:[response.data.message]
    })
}
    }
})

}


    return (

        <div>
            <p>welcome to login page</p>
           
            <form  onSubmit={onSubmit}>
            {errors&&<div> 
                    {Object.keys(errors).map(key=>(
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                    </div>}
                <input ref={emailRef} type="email"  placeholder="email"/><br/><br/>
                <input ref={passwordRef} type="password" /><br/><br/>
                <button type="submit">login</button>
            </form>
        </div>
    )
}
export default Login