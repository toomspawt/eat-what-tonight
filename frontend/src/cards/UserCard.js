import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import RegisterCard from './RegisterCard';

function UserCard({ user }) {
  const { loginUser, logoutUser } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false)

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

  return !showRegister? (
      <div className="card card-container">
        <form className="form-signin" onSubmit={handleSubmit}>
          <img 
            alt="login" id="profile-img" 
            className="profile-img-card" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
          />
          <input className="form-control" type="text" id="username" placeholder="Enter Username" />
          <input className="form-control" type="password" id="password" placeholder="Enter Password" />

          <button 
            className="btn btn-lg btn-primary btn-block btn-signin" 
            type="submit"
          > 
            Login
          </button>
          <p href="#" className="forgot-password" onClick={setShowRegister}>Don't have an account?</p>
        </form>    
      </div>
  ) : (
    <RegisterCard 
      showRegister={showRegister}
      setRegister={() => {setShowRegister(!showRegister);}}
    />
  )
};

export default UserCard