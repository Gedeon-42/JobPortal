import { useRef, useState } from "react"
import axiosClient from "../../axiosClient"
import { useStateContext } from "../../context/ContextProvider"

const Signup = ()=>{
    // refs of input
    const nameRef= useRef()
    const emailRef = useRef()
    const passwordRef=useRef()
    const passwordConfirmationRef=useRef()
    const [errors,setErrors]=useState()

// importing context
const{setUser,setToken}=useStateContext()

    const onSubmit =(ev)=>{
ev.preventDefault()
const payload={
    name : nameRef.current.value,
    email:emailRef.current.value,
    password:passwordRef.current.value,
    password_confirmation:passwordConfirmationRef.current.value
}

axiosClient.post('/signup',payload).then(({data})=>{
    setUser(data.user)
    setToken(data.token)
}).catch(err=>{
    const response = err.response
    if(response &&response.status === 422){
        console.log(response.data.errors)
        setErrors(response.data.errors)
    }
})
console.log(payload)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                {errors&&<div> 
                    {Object.keys(errors).map(key=>(
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                    </div>}
                <input ref={nameRef} type="text" placeholder="username"/>
                <br/><br/>
                <input ref={emailRef} type="email" placeholder="email"/>   <br/><br/>
                <input ref={passwordRef} type="password" placeholder="password"/>   <br/><br/>
                <input ref={passwordConfirmationRef} type="password" placeholder="password confirmation"/>   <br/><br/>

                <button>register</button>
            </form>
        </div>
    )
}
export default Signup