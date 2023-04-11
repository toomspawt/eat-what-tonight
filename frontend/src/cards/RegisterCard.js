import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export default function RegisterCard() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const { registerUser } = useContext(AuthContext);
    let [ showRegister, setShowRegister ] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            registerUser(username, password, password2);
        } catch(err) {
            console.log(err);
        }
    };

    return !showRegister ? (
        <button onClick={() => setShowRegister(!showRegister)}>Register</button>
    ) : (
        <div className="card">
            <button onClick={() => setShowRegister(!showRegister)}>X</button>
            <form onSubmit={(e) => {handleSubmit(e); setShowRegister(!showRegister);}}>
                <h1>Register</h1>
                <hr />
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        onChange={e => setPassword2(e.target.value)}
                        placeholder="Confirm Password"
                        required
                    />
                    <p>{password2 !== password ? "Passwords do not match" : ""}</p>
                </div>
                <button>Register</button>
            </form>
        </div>
    )
}