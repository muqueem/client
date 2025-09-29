import React from "react";
import { Link } from "react-router-dom";
import facebookIcon from "../assets/social-links/1.png";
import instagramIcon from "../assets/social-links/2.png";
import linkedinIcon from "../assets/social-links/3.png";
import twitterIcon from "../assets/social-links/4.png";
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
      {/* Top section */}
      <div className="container px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <Link to={"/"}>
              <img
                className="w-[120px] sm:w-[150px]"
                src="/logo.png"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Links */}
          <div className="flex justify-center">
            <ul className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center">
              <Nav />
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end space-x-4 sm:space-x-6">
            {socialLinks.map((social, index) => (
              <Link
                target="_blank"
                key={index}
                to={social.href}
                title={social.name}
              >
                <img
                  className="w-6 sm:w-8 hover:scale-110 transition-transform duration-200"
                  src={social.icon}
                  alt={social.name}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © {currentYear} STOXIE. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4">
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
