import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate("/register");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#112d55] shadow-md px-6 py-4 flex justify-between items-center rounded-b-3xl ml-4 mr-4">
      <div className="flex items-center gap-2">
        <img
          src="/Logo.png"
          alt="ConnectWell Logo"
          className="h-16 w-16 rounded-full object-cover bg-white"
        />
        <a
          href="/"
          className="text-xl font-bold text-[#f9f1f1] hover:text-[#6670ad]"
        >
          ConnectWell
        </a>
      </div>

      <ul className="flex space-x-6 text-[#f9f1f1] font-medium items-center">
        <li>
          <a href="#welcome" className="hover:text-[#6670ad]">
            Info
          </a>
        </li>
        <li>
          <a href="#requests" className="hover:text-[#6670ad]">
            Requests
          </a>
        </li>
        <li>
          <a href="#book" className="hover:text-[#6670ad]">
            Book Help
          </a>
        </li>
        <li>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleRegister}
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-2 rounded-full transition"
            >
              Register
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
