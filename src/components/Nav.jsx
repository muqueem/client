import React from 'react'
import { NavLink } from 'react-router-dom';

const Nav = ({ setIsMenuOpen = () => { } }) => {

  // Nav.js
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "Contact Us", href: "/contact" },
  ];


  return (
    <>
      {quickLinks.map((link, index) => (
        <li key={index} onClick={() => setIsMenuOpen(false)} className='nav-item text-white hover:text-[#dbb149] transition-all duration-300'><NavLink to={link.href} className={(({ isActive }) => isActive ? "text-[#dbb149] font-semibold" : "")}>{link.name}</NavLink></li>
      ))}
    </>
  )
}

export default Nav;
