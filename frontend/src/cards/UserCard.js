import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";

const UserCard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="card">
      {user && <UserInfo user={user} />}
      <h1>You are on home page!</h1>
    </div>
  );
};

export default UserCard;