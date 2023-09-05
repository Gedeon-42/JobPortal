import { useRef } from "react"
import axiosClient from "../../axiosClient"
import { useStateContext } from "../../context/ContextProvider"

const Signup = ()=>{
    // refs of input
    const nameRef= useRef()
    const emailRef = useRef()
    const passwordRef=useRef()
    const passwordConfirmationRef=useRef()

// importing context
const{setUser,setToken}=useStateContext()

    const onSubmit =(ev)=>{
ev.preventDefault()
const payload={
    name : nameRef.current.value,
    email:emailRef.current.value,
    passwordRef:passwordRef.current.value,
    password_Confirmation:passwordConfirmationRef.current.value
}

axiosClient.post('/signup',payload).then(({data})=>{
    setUser(data.user)
    setToken(data.token)
}).catch(err=>{
    const response = err.response
    if(response &&response.status === 422){
        console.log(response.data.errors)
    }
})
console.log(payload)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input ref={nameRef} type="text" placeholder="username"/>
                <input ref={emailRef} type="email" placeholder="email"/>
                <input ref={passwordRef} type="password" placeholder="password"/>
                <input ref={passwordConfirmationRef} type="password" placeholder="password confirmation"/>
                <button>register</button>
            </form>
        </div>
    )
}
export default Signup