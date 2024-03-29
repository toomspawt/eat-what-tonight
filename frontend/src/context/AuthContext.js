import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
//import { useHistory } from "react-router-dom";

const BASEURL = "https://toomspawt.pythonanywhere.com/api";
//const BASEURL = "http://127.0.0.1:8000/api";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
        ? jwt_decode(localStorage.getItem("authTokens"))
        : null
    );
    const [loading, setLoading] = useState(true);
    //const history = useHistory();

    const loginUser = async (username, password) => {
        const response = await fetch(BASEURL + "/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            //history.push("/");
        } else {
            alert("Invalid username or password. Please try again.");
        }
    };

    const registerUser = async (username, password, password2) => {
        const response = await fetch(BASEURL + "/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                password2
            })
        });
        if (response.status === 201) {
            alert("Registered!");
            return("Registered");
            //history.push("/login");
        } else {
            const errors = await response.json();
            let notification = "Registration failed due to the following reason(s): \n";
            for (let key in errors) 
                for (let error in errors[key])  notification += '- ' + errors[key][error] + '\n';
            alert(notification);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);     
        localStorage.removeItem("authTokens");
        //history.push("/");
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
        {loading ? null : children}
        </AuthContext.Provider>
    );
};