import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

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
                <input
                    type="password"
                    id="confirm-password"
                    className={'form-control ' + (password2 !== password ? "is-invalid" : "")}
                    onChange={e => setPassword2(e.target.value)}
                    placeholder="Confirm Password"
                    required
                />
                <p className="password-not-match">{password2 !== password ? "Passwords do not match" : ""}</p>
                <button className="btn btn-lg btn-primary btn-block btn-signin">Register</button>
                <p href="#" className="forgot-password" onClick={setRegister}>Already have an account?</p>
            </form>
        </div>
    )
}