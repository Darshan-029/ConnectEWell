import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { isAuthenticated, logout } from "../utils/auth";

const LandingPage = () => {
  const topRef = useRef(null);
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, []);

  const scrollToTop = () => {
    console.log("clicked");
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToHero = () => {
    const offset = heroRef.current.offsetTop - 100;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  return (
    <div ref={topRef} className="bg-white min-h-screen font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-[#112d55] shadow-md sticky top-0 z-50 rounded-b-3xl ml-4 mr-4">
        <div className="flex items-center gap-2">
          <img
            src="/Logo.png"
            alt="ConnectWell Logo"
            className="h-16 w-16 rounded-full object-cover bg-white"
          />
          <div className="text-white text-2xl font-bold tracking-wide">
            ConnectWell
          </div>
        </div>
        <div className="flex gap-6 text-[#f9f1f1] text-lg font-semibold">
          <button onClick={scrollToTop} className="focus:outline-none">
            Home
          </button>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={scrollToHero} className="focus:outline-none">
            Why Us?
          </button>
        </div>
        <div>
          {loggedIn ? (
            <button
              onClick={() => {
                logout();
                setLoggedIn(false);
                navigate("/");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/register"
              className="bg-[#f9f1f1] text-black px-4 py-2 rounded-full hover:bg-[#a6a6a6]"
            >
              Register
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-[#b7efff] h-screen mb-8 rounded-3xl ml-4 mr-4 mt-4 backdrop-blur-2xl shadow-2xl">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-[#112d55] mb-10">
            ConnectWell: Supporting the Elderly with Care
          </h1>
          <p className="text-lg text-[black] mb-10">
            A hyper-local platform that connects elderly individuals with
            kind-hearted volunteers nearby for everyday non-medical assistance.
          </p>
          <Link
            to="/dashboard"
            className="bg-[#112d55] text-white px-6 py-3 rounded-full hover:bg-[#6670ad]"
          >
            Get Started
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center animate-float">
          <img
            src="/beneficiary.png"
            alt="Elder support"
            className="w-full max-w-sm"
          />
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={heroRef}
        className="bg-[#fff3aa] px-10 py-20 h-screen mb-8 rounded-3xl ml-4 mr-4 backdrop-blur-2xl shadow-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#112d55] mb-12">
          Why Choose ConnectWell?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-white shadow-lg rounded-full p-10 text-center hover:shadow-2xl transition transform transition-transform duration-300 ease-in-out hover:scale-105">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4213/4213927.png"
              alt="Voice Assistance"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-[#2d6a4f] mb-2">
              Voice-Assisted Requests
            </h3>
            <p className="text-[#444] text-base">
              Users can raise service requests through simple voice commands,
              reducing reliance on typing and making it accessible for all.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-lg rounded-full p-10 text-center hover:shadow-2xl transition transform transition-transform duration-300 ease-in-out hover:scale-105">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4007/4007081.png"
              alt="Verified Network"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-[#2d6a4f] mb-2">
              Verified Volunteer Network
            </h3>
            <p className="text-[#444] text-base">
              We connect you only with screened, trusted individuals focused on
              non-medical human support tasks to ensure peace of mind.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-lg rounded-full p-10 text-center hover:shadow-2xl transition transform transition-transform duration-300 ease-in-out hover:scale-105">
            <img
              src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
              alt="Location Based Matching"
              className="w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-[#2d6a4f] mb-2">
              Nearby Volunteer Matching
            </h3>
            <p className="text-[#444] text-base">
              We notify available volunteers within your area, ensuring help is
              timely, local, and ready when you need it.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
