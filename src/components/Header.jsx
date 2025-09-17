import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
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
      if (!token) {setIsLoggedin(false); return};
      try {
        const res = await verifyUser(token);
        setIsLoggedin(true);
      } catch (error) {
        console.error(error);
        setIsLoggedin(false);
      }
    }

    checkAuth();
  }, [token]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
        setHideNavbar(true);
      } else {
        setHideNavbar(false);
      }
      lastScrollY.current = window.scrollY;
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  return (
    <header className={`header border-b border-b-gray-300 cursor-pointer w-full bg-gray-900 shadow-lg z-10 fixed transition-all duration-300 left-0 ${hideNavbar ? "-top-48" : "top-0"}`}>
      <div className="container grid grid-cols-3 items-center py-4">
        <div className="logo">
          <Link to="/">
            <img className="w-[150px] max-md:w-[100px]" src="/logo.png" alt="" />
          </Link>
        </div>

        <nav className="navbar max-md:hidden">
          <ul className='flex md:gap-5 lg:gap-10 justify-center'>
            <Nav />
          </ul>
        </nav>

        <div className="flex justify-end">
          {isLoggedin ? (
            <Link to="/my-account">
              <div className="w-12 h-12 bg-[#0083cf] rounded-full flex items-center justify-center text-white font-bold text-lg hover:bg-blue-900 transition-colors duration-300">
                {user?.name?.charAt(0) || <FaUserCircle className="text-5xl text-white " />}
              </div>
            </Link>
          ) : (
            <button className="px-10 max-md:hidden max-md:text-sm max-md:px-3 max-md:py-1 py-2 bg-white shadow-2xl -shadow-sky-700 text-md hover:bg-[#0083cf] hover:text-white text-black font-semibold rounded transition-all duration-300">
              <Link to={"/login"}>
                Sign in
              </Link>
            </button>
          )}
        </div>

        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen
            ? <IoMdClose className="w-8 h-8" />
            : <IoIosMenu className="w-8 h-8" />
          }
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full z-10 py-6">
          <div className="absolute inset-0"></div>
          <div className="container">
            <ul className='flex items-end flex-col gap-10'>
              <Nav setIsMenuOpen={setIsMenuOpen} />
            </ul>
            <button
              className="mt-6 px-6 py-2 bg-yellow-500 text-black font-semibold rounded w-full hover:bg-[#dbb149] hover:text-white transition-colors duration-300"
            >
              Get a Quote
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
