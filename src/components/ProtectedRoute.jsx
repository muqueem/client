import { Navigate } from "react-router-dom";
import { verifyUser } from "../api/auth";
import { useEffect, useState } from "react";
import { getDecryptedData } from "../utils/encryption";

const ProtectedRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(null);
  const token = getDecryptedData("token");

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setTimeout(() => setIsVerified(false), 1000);
        return;
      }
      try {
        const res = await verifyUser(token);

        setTimeout(() => setIsVerified(res.isUserLoggedIn), 1000);
      } catch (err) {
        setTimeout(() => setIsVerified(false), 1000);
      }
    };

    checkAuth();
  }, [token]);

  if (isVerified === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-black/70 transition-colors duration-500">
        <span className="loader"></span>
      </div>
    );
  }

  return isVerified ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
