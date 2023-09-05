import { useRef, useState } from "react"
import axiosClient from "../../axiosClient"
import { useStateContext } from "../../context/ContextProvider"
import { Link } from "react-router-dom"


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

        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                <h3 className="title">Login</h3>
                <form onSubmit={onsubmit}>
                    <input ref={emailRef} type="email" placeholder="email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="password"
                    />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        NotRegisterd?<Link to="/signup">Register</Link>
                    </p>
                </form>
            </div>
        </div>
          
    )
}
export default Login