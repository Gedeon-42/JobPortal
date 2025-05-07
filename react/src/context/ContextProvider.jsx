import { createContext, useContext, useState } from "react";

const stateContext = createContext({
    user: null,
    token: null,
    notification: null,

    setNotification: () => {},
    setUser: () => {},
    setToken: () => {},
});
const initialState = {
    notification: false,
    message: false,
    userProfile: false,
};

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [isactive, setIsactive] = useState(true);
    //to change screen
    const [screenSize, setScreenSize] = useState(undefined);
    const [notification, _setNotification] = useState("");
    // state to display navbar profile and notification component
    const [isClicked, setIsClicked] = useState(initialState);

    // const [surveys, setSurveys] = useState(tmpSurveys);
    

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };
    const setNotification = (message) => {
        -setNotification(message);
        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };
    const handleClick = (clicked) => {
        setIsClicked({ ...initialState, [clicked]: true });
    };
    return (
        <stateContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                isactive,
                setIsactive,
                notification,
                setNotification,
                isClicked,
                screenSize,
                setScreenSize,
                setIsClicked,
                handleClick,
            }}
        >
            {children}
        </stateContext.Provider>
    );
};
export const useStateContext = () => useContext(stateContext);