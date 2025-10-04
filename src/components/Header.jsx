import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { verifyUser } from "../api/auth";
import { getDecryptedData } from "../utils/encryption";

const Header = () => {
  const token = getDecryptedData("token");
  const user = getDecryptedData("user");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  let lastScrollY = useRef(0);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsLoggedin(false);
        return;
      }
      try {
        await verifyUser(token);
        setIsLoggedin(true);
      } catch (error) {
        console.error(error);
        setIsLoggedin(false);
      }
    };

    checkAuth();
  }, [token]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
        setHideNavbar(true);
      } else {
        setHideNavbar(false);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`header border-b border-b-gray-300 cursor-pointer w-full bg-gray-900 shadow-lg z-50 fixed transition-all duration-300 left-0 ${
        hideNavbar ? "-top-48" : "top-0"
      }`}
    >
      <div className="container grid grid-cols-2 md:grid-cols-3 items-center py-4 relative z-50">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img
              className="w-[100px] max-md:w-[80px]"
              src="/logo.png"
              alt="Logo"
            />
          </Link>
        </div>

        <nav className="navbar hidden md:block">
          <ul className="flex md:gap-5 lg:gap-10 justify-center">
            <Nav />
          </ul>
        </nav>

        {/* Right side */}
        <div className="flex justify-end items-center gap-4">
          {isLoggedin ? (
            <Link to="/my-account">
              <div className="w-12 h-12 bg-[#0083cf] rounded-full max-md:hidden flex items-center justify-center text-white font-bold text-lg hover:bg-blue-900 transition-colors duration-300">
                {user?.name?.charAt(0) || "H"}
              </div>
            </Link>
          ) : (
            <Link to="/login">
              <button className="px-6 py-2 bg-white shadow-2xl max-md:hidden text-md hover:bg-[#0083cf] hover:text-white text-black font-semibold rounded transition-all duration-300">
                Sign in
              </button>
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden transition-transform duration-300 ease-in-out z-50"
          >
            {!isMenuOpen && <IoIosMenu className="w-8 h-8 text-white transform rotate-0 transition-transform duration-300" />}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-gray-900 overflow-hidden fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "max-h-screen opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-5"
        }`}
      >
        <div className="container py-6 flex flex-col items-start gap-10">
          <button
            onClick={toggleMenu}
            className="md:hidden transition-transform duration-300 ease-in-out z-50 absolute right-8"
          >
            <IoMdClose className="w-8 h-8 text-white transform rotate-180 transition-transform duration-300" />
          </button>
          {isLoggedin ? (
            <Link to="/my-account">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 bg-[#0083cf] rounded-full flex items-center justify-center text-white font-bold text-lg hover:bg-blue-900 transition-colors duration-300"
              >
                {user?.name?.charAt(0) || "H"}
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-2 bg-white shadow-2xl text-md hover:bg-[#0083cf] hover:text-white text-black font-semibold rounded transition-all duration-300"
              >
                Sign in
              </button>
            </Link>
          )}
          <ul className="flex flex-col gap-10">
            <Nav setIsMenuOpen={setIsMenuOpen} />
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
