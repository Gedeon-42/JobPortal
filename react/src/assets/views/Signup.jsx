import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../context/ContextProvider";
const SignUp = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);
    const onsubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        //console.log(payload);
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                // router.navigate("/admin/users");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    //console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            });

       
    };
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
                <h3 className="title">register</h3>
                <form onSubmit={onsubmit}>
                    <input ref={nameRef} placeholder="full name" />
                    <input ref={emailRef} type="email" placeholder="email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="password"
                    />
                    <input
                        type="password"
                        placeholder="password_confirmation"
                        ref={passwordConfirmationRef}
                    />
                    <button className="btn btn-block">registerd</button>
                    <p className="message">
                        Already registered?<Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
export default SignUp;