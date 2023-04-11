import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function UserCard({ user }) {
  const { loginUser, logoutUser } = useContext(AuthContext);

  // if logged in, say hello
  if (user) return (
    <div className="card">
      <h1>Hello, {user.username}</h1>
      <h1>You are on home page!</h1>
      <button onClick={logoutUser}>Logout</button>
    </div>
  )
  
  // if not logged in, render LoginCard
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h1>Login </h1>
          <hr />
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter Username" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter Password" />
          <button type="submit">Login</button>
        </form>
      </div>
  );
};

export default UserCard