import React from "react";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import facebookIcon from "../assets/social-links/1.png";
import instagramIcon from "../assets/social-links/2.png"
import linkedinIcon from "../assets/social-links/3.png"
import twitterIcon from "../assets/social-links/4.png"
import { Link } from "react-router-dom";
import Nav from "./Nav";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Facebook", icon: facebookIcon, href: "https://www.facebook.com/" },
    { name: "Instagram", icon: instagramIcon, href: "https://www.instagram.com/" },
    { name: "LinkedIn", icon: linkedinIcon, href: "https://www.linkedin.com/" },
    { name: "Twitter", icon: twitterIcon, href: "https://x.com/" },
  ];

  return (
    <footer className="bg-gray-900 text-white shadow-lg">
      <div className="container py-5">
        <div className="grid md:grid-cols-3 items-center">
          <div className="footer-about">
            <div className="text-2xl font-bold">
              <Link to={"/"}>
                <img className='w-[150px]' src="/logo.png" alt="" />
              </Link>
            </div>
          </div>

          <div className="footer-links">
            <ul className="flex md:gap-5 lg:gap-10 justify-center">
              <Nav />
            </ul>
          </div>

          <div className="flex space-x-5 justify-end">
            {socialLinks.map((social, index) => (
              <Link
                target="_blank"
                key={index}
                to={social.href}
                title={social.name}
              >
                <img className="max-md:w-7 w-9 hover:scale-110 transition-all duration-200" src={social.icon} alt={social.name} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} STOXIE. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                to="/"
                className="text-gray-300 hover:text-yellow-500 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/"
                className="text-gray-300 hover:text-yellow-500 text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
