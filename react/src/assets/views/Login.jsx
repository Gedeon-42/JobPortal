import { Link } from "react-router-dom";
import { useRef, useState } from "react";

import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axiosClient";
const Login = () => {
    const emailRef = useRef();
    const passworRef = useRef();
    const [errors, setErrors] = useState();
    const { setUser, setToken } = useStateContext();
    const onsubmit = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            //email: emailRef.current.value,
            password: passworRef.current.value,
        };
        //console.log(payload);
        setErrors(null);
        // axiosClient
        //     .post("/login", payload)
        //     .then(({ data }) => {
        //         setUser(data.user);
        //         setToken(data.token);
        //         // router.navigate("/admin/users");
        //     })
        //     .catch((err) => {
        //         const response = err.response;
        //         if (response && response.status === 422) {
        //             //console.log(response.data.errors);
        //             setErrors(response.data.errors);
        //         }
        //     });
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    //console.log(response.data.errors);
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        });
                    }
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
                <h3 className="title">Login</h3>
                <form onSubmit={onsubmit}>
                    <input ref={emailRef} type="email" placeholder="email" />
                    <input
                        ref={passworRef}
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
    );
};
export default Login;
