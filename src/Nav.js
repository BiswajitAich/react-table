import React from "react";
import { Link } from "react-router-dom";


const Nav = () => {
  return (
    <div className="nav" >
      <Link to="/"><h2>Home</h2></Link>
      <Link to="/Table"><h2>Table</h2></Link>
      <Link to="/TableInput"><h2>Add new</h2></Link>
    </div>
  );
};

export default Nav;
