import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { clearStorage, getDecryptedData } from "../utils/encryption";
import ProtectedRoutes from "../components/ProtectedRoute";
import toast from "react-hot-toast";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const MyAccount = () => {
  const location = useLocation();
  const user = getDecryptedData("user");
  const pathname = location.pathname.split("/")[2] || "edit-profile";
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const sideNavs = [
    { name: "Edit Profile", href: "edit-profile" },
    { name: "Dashboard", href: "dashboard" },
    { name: "My Subscription", href: "my-subscription" },
  ];

  const filteredNavs = user?.isAdmin
    ? sideNavs
    : sideNavs.filter((nav) => nav.name !== "Dashboard");

  const handleLogout = () => {
    clearStorage();
    toast.success("Logged out Successfully!!");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const parts = location.pathname.split("/");
    if (!parts[2]) {
      navigate("edit-profile", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <ProtectedRoutes>
      <div>
        {/* Header */}
        <section className="w-full bg-[#0083cf] text-white py-5">
          <h1 className="text-3xl text-center md:text-4xl font-bold">
            My Account
          </h1>
        </section>

        {/* Mobile toggle button */}
        <div className="md:hidden flex justify-end items-center bg-gray-50 px-4 py-3 shadow relative z-30">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-700 text-3xl focus:outline-none transition-transform duration-300"
          >
            {showMenu ? (
              <HiX className="rotate-180 transition-transform duration-300" />
            ) : (
              <HiMenuAlt3 className="rotate-0 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Overlay */}
        {showMenu && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
            onClick={() => setShowMenu(false)}
          ></div>
        )}

        <div className="container grid md:grid-cols-[20%_1fr] gap-6 py-10 relative">
          {/* Side Nav */}
          <aside
            className={`fixed md:static top-0 left-0 h-full md:h-auto bg-white md:bg-transparent z-40 transform md:transform-none transition-transform duration-300 ease-in-out w-64 md:w-auto
            ${showMenu ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
          >
            <ul className="flex flex-col gap-3 p-6 md:p-0 mt-16 md:mt-12">
              {filteredNavs.map((nav, i) => {
                const isActive = pathname === nav.href;
                return (
                  <li key={i} className="list-none">
                    <Link to={nav.href}>
                      <div
                        role="link"
                        tabIndex={0}
                        onClick={() => setShowMenu(false)} // close menu after click on mobile
                        className={`cursor-pointer md:text-lg p-4 text-base rounded-lg transition-colors duration-300
                          ${
                            isActive
                              ? "bg-gray-900 text-white ring-2"
                              : "bg-blue-50 text-gray-800 hover:bg-blue-100"
                          }`}
                      >
                        {nav.name}
                      </div>
                    </Link>
                  </li>
                );
              })}
              <li className="list-none">
                <div
                  onClick={() => {
                    handleLogout();
                    setShowMenu(false);
                  }}
                  role="link"
                  tabIndex={0}
                  className="cursor-pointer md:text-lg p-4 text-base rounded-lg bg-blue-50 transition-colors duration-300 text-gray-800 hover:bg-gray-900 hover:text-white"
                >
                  Logout
                </div>
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="z-0">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoutes>
  );
};

export default MyAccount;
