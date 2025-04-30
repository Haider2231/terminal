import React from "react";
import logo from "../assets/terminal-logo.png";

const Header = () => {
  return (
<header className="custom-header">
  <div className="header-container">
    <img src={logo} alt="Logo" className="logo" />
    <div className="button-group">
      <button className="header-button">Sign up</button>
      <button className="header-button">Register</button>
    </div>
  </div>
</header>
  );
};

export default Header;