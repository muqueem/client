import React, { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { clearStorage, getDecryptedData } from '../utils/encryption';
import ProtectedRoutes from "../components/ProtectedRoute"
import toast from 'react-hot-toast';

const MyAccount = () => {
    const location = useLocation();
    const user = getDecryptedData("user");
    const pathname = location.pathname.split("/")[2] || "edit-profile";
    const navigate = useNavigate();

    const sideNavs = [
        { name: "Edit Profile", href: "edit-profile" },
        { name: "Dashboard", href: "dashboard" },
        { name: "My Subscription", href: "my-subscription" },
    ];

    const filteredNavs = user?.isAdmin
        ? sideNavs
        : sideNavs.filter(nav => nav.name !== "Dashboard");

    const handleLogout = () => {
        debugger;
        clearStorage();
        toast.success("Logged out Successfully!!");
        navigate("/");
        window.location.reload();
    }

    useEffect(() => {
        // if no subpath present, navigate to default
        const parts = location.pathname.split("/");
        if (!parts[2]) {
            navigate("edit-profile", { replace: true });
        }
    }, [location.pathname, navigate]);

    return (
        <ProtectedRoutes>
            <div className=''>
                <section className="w-full bg-[#0083cf] text-white py-5">
                    <h1 className="text-3xl text-center md:text-4xl font-bold">
                        My Account
                    </h1>
                </section>

                <div className="grid container md:grid-cols-[20%_1fr] gap-6 py-20">
                    <aside className="sidenav mt-12">
                        <ul className='flex flex-col gap-3'>
                            {filteredNavs.map((nav, i) => {
                                const isActive = pathname === nav.href;
                                return (
                                    <li key={i} className="list-none">
                                        <Link to={nav.href}>
                                            <div
                                                role="link"
                                                tabIndex={0}
                                                className={`cursor-pointer md:text-lg p-4 text-base rounded-lg transition-colors duration-300
                                                    ${isActive
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
                                    onClick={handleLogout}
                                    role="link"
                                    tabIndex={0}
                                    className="cursor-pointer md:text-lg p-4 text-base rounded-lg bg-blue-50 transition-colors duration-300 text-gray-800 hover:bg-gray-900 hover:text-white"
                                >
                                    Logout
                                </div>
                            </li>
                        </ul>
                    </aside>

                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </ProtectedRoutes>
    );
}

export default MyAccount;
