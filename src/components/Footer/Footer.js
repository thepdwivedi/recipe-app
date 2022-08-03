import React, { useContext } from "react";
import UserContext from "../User/User";
const Footer = () => {
  const user = useContext(UserContext);
  return (
    <div className="App-footer">
      <ul>
        <li>{user.appName}</li>
        <li>{user.name}</li>
        <li>Version: {user.version}</li>
      </ul>
    </div>
  );
};

Footer.defaultProps = {};

export default Footer;
