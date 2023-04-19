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

  /*


  return !showRegister? (
      <div className="login-container">
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={handleSubmit}>
              
              <div className="login__field">
                {
                  //<i className="login__icon fas fa-user" />
                }
                <input type="text" className="login__input" id="username" placeholder="Username"/>
              </div>
              <div className="login__field">
                {
                  //<i className="login__icon fas fa-lock"></i>
                }
                <input type="password" className="login__input" id="password" placeholder="Password"/>
              </div>
              <button className="button login__submit">
                <span className="button__text">Log In</span>
                {
                  //<i className="button__icon fas fa-chevron-right"></i>
                }
              </button>				
            </form>
            <div className="social-login">
              <p onClick={setShowRegister}>Don't have an account?</p>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>		
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>		
        </div>
      </div>
  ) : (
    <RegisterCard 
      showRegister={showRegister}
      setRegister={() => {setShowRegister(!showRegister);}}
    />
  )
}
*/
export default UserCard