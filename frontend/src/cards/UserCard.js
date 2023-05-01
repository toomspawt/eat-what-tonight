import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import RegisterCard from './RegisterCard';
import ReactCardFlip from 'react-card-flip';

function UserCard() {
  const { loginUser } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (!(username.length > 0 && password.length > 0)) {
      alert("Invalid username or password. Please try again");
    } else {
      loginUser(username, password);
    }
  };

  const renderLogin = () => {
    return (
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
            Log in
          </button>
          <p href="#" className="forgot-password" onClick={setShowRegister}>Don't have an account?</p>
        </form>    
      </div>
      )
  }

  return (
    <ReactCardFlip isFlipped={showRegister} flipDirection="vertical">
        {renderLogin()}

        <RegisterCard 
          showRegister={showRegister}
          setRegister={() => {setShowRegister(!showRegister);}}
        />
    </ReactCardFlip>
  )
  
};
export default UserCard