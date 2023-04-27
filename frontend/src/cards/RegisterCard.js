import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import passwordCheckCommon from '../utils/commonPassword'

export default function RegisterCard(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const { registerUser } = useContext(AuthContext);
    let showRegister = props.showRegister;
    let setRegister = props.setRegister;

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            registerUser(username, password, password2);
        } catch(err) {
            console.log(err);
        }
    };

    const passwordCheckLength = () => {return password.length >= 8}
    const passwordCheckNumeric = () => {
        return !/^\d+$/.test(password);
    }

    return !showRegister ? (
        <div></div>
    ) : (
        <div className="card card-container">
            <form className="form-signin" onSubmit={(e) => {handleSubmit(e); setRegister();}}>
                <h3 style={{"textAlign": "center"}}>Create an account</h3>
                <hr />
                <input
                    type="text"
                    id="username"
                    className="form-control"
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <li className={password.length === 0 ? "text-secondary" : passwordCheckLength() ? "text-success" : "text-danger"}>
                    At least 8 characters
                    {passwordCheckLength() ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                        </svg>
                    ): (<></>)}
                </li>
                <li className={password.length === 0 ? "text-secondary" : passwordCheckNumeric() ? "text-success" : "text-danger"}>
                    Not entirely numeric
                    {(passwordCheckNumeric() && password.length > 0) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                        </svg>
                    ): (<></>)}
                </li>
                <li className={password.length === 0 ? "text-secondary" : passwordCheckCommon(password) ? "text-success" : "text-danger"}>
                    Not too common
                    {passwordCheckCommon(password) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                        </svg>
                    ): (<></>)}
                </li>
                <input
                    type="password"
                    id="confirm-password"
                    className={'form-control ' + ((password2 !== password && password2.length > 0) ? "is-invalid" : "")}
                    onChange={e => setPassword2(e.target.value)}
                    placeholder="Confirm Password"
                    required
                />
                <p className="text-danger">{(password2 !== password && password2.length > 0) ? "Passwords do not match" : ""}</p>
                <button className="btn btn-lg btn-primary btn-block btn-signin">Register</button>
                <p href="#" className="forgot-password" onClick={setRegister}>Already have an account?</p>
            </form>
        </div>
    )
}