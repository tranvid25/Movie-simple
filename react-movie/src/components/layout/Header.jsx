import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="flex items-start justify-center py-10 mb-10 text-white header gap-x-5">
      <NavLink to="/" className={({isActive})=> (isActive ? "text-primary" : "")}>Home</NavLink>
      <NavLink to="/movies" className={({isActive})=>(isActive ? "text-primary" : "")}>Movie</NavLink>
    </header>
  );
};

export default Header;
