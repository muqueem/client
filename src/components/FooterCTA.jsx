import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDecryptedData } from '../utils/encryption';
import { verifyUser } from '../api/auth';

const FooterCTA = () => {
  const token = getDecryptedData("token");
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) { setIsLoggedin(false); return };
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

  return (
    <section className="relative flex justify-center border border-whit max-md:mb-2 md:mt-40 md:h-44 bg-gray-900">
      <div className="md:container md:absolute md:bottom-12 md:border md:border-gray-600 max-md:px-4 rounded-2xl text-center py-5 md:py-8 bg-gradient-to-r shadow-2xl from-gray-900 via-blue-900 to-gray-900">
        <h2 className="text-xl md:text-3xl font-bold text-white mb-4">
          Ready to Trade with Confidence?
        </h2>
        <p className="md:text-xl text-blue-100 mb-5 md:mb-8">
          Experience the platform trusted by hundreds of thousands of traders worldwide.
        </p>
        <button className="bg-gray-900 text-white font-semibold py-4 px-8 rounded-lg md:text-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-300">
          {isLoggedin ? <Link to={"/plans"}>See our plans</Link> : <Link to={"/login"}>Sign in Now</Link>}
        </button>
      </div>
    </section>
  )
}

export default FooterCTA;
