import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function RegisterCard() {
    const { registerUser } = useContext(AuthContext)
    return (
        <button>Register</button>
    )
}