// src/components/ElderDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getUserInfo, isAuthenticated, logout } from "../utils/auth";
import { format } from "date-fns";

const ElderDashboard = () => {
  const navigate = useNavigate();
  const [activeRequests, setActiveRequests] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const handleCancelRequest = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_NGROK_URL}/deleteRequest/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Request deleted");
        setActiveRequests((prev) => prev.filter((req) => req._id !== id));
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/allHelpRequests`)
      .then((res) => res.json())
      .then((data) => {
        const currentUser = getUserInfo();
        const filtered = data.filter(
          (req) => req.user?._id === currentUser.userId
        );
        setActiveRequests(filtered);
      })
      .catch((err) => {
        console.error("Failed to fetch help requests:", err);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated()) {
        navigate("/register");
        return;
      }

      const links = document.querySelectorAll('a[href^="#"]');
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute("href"));
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        });
      });
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleBookClick = () => {
    navigate("/vapiCall");
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />

      {/* Welcome Section */}
      <section
        id="welcome"
        className="bg-gradient-to-r from-[#fefae0] to-[#faedcd] min-h-screen py-12 px-8 md:px-24 flex flex-col md:flex-row items-center scroll-mt-20 rounded-3xl ml-4 mr-4 mt-4 shadow-xl"
      >
        <div className="flex-1 order-2 md:order-1">
          <h1 className="text-3xl md:text-5xl font-bold text-[#112d55] mb-5">
            Welcome, {getUserInfo()?.name || "Unknown user"} to the Assistance
            Dashboard!
          </h1>
          <div className="bg-white/50 rounded-full p-12 shadow-sm">
            <p className="text-[#606c38] text-[1.125rem] mb-5">
              This dashboard helps you easily connect with kind local volunteers
              for everyday needs. Your voice assistant can also help you book
              services by just speaking.
            </p>
            <ul className="list-disc pl-6 text-[#606c38] text-[1.125rem]">
              <li>Ask for help with groceries, walks, or reading</li>
              <li>Track your ongoing requests</li>
              <li>Feel connected and supported</li>
            </ul>
          </div>
        </div>
        <div className="flex-1 order-1 md:order-2 flex justify-end">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
            alt="Elder support illustration"
            className="w-full max-w-md drop-shadow-xl animate-float"
          />
        </div>
      </section>

      {/* Request Overview Section */}
      <section
        id="requests"
        className="bg-gradient-to-br from-[#fcd5ce] to-[#ffcdb2] py-10 px-4 md:px-12 scroll-mt-20 mt-4 backdrop-blur-2xl shadow-xl rounded-3xl ml-4 mr-4"
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start w-full">
          <div className="lg:w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1b4332] mb-4">
              Your Active Requests
            </h2>
            <div className="bg-white/50 rounded-full p-8 shadow-sm mb-6">
              <p className="text-[#112d55] text-[1.125rem]">
                These are the current services you’ve requested. You can track
                progress and connect with your helpers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-start">
              {activeRequests.map((request) => {
                const isExpanded = expandedCardId === request._id;

                return (
                  <div
                    key={request._id}
                    className="flex flex-col justify-between bg-white/60 backdrop-blur-lg border border-[#d3d3d3] rounded-3xl shadow-lg p-6 transition-all hover:shadow-2xl hover:scale-[1.03] duration-300"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-[#3e3e60] mb-3 tracking-tight">
                        {request.title}
                      </h3>

                      <div className="mb-2 text-sm text-[#6c757d]">
                        📅 <span className="font-medium">Requested:</span>{" "}
                        {format(new Date(request.createdAt), "PPPpp")}
                      </div>

                      <div className="mb-2 text-sm text-[#6c757d]">
                        👤{" "}
                        <span className="font-medium">Assigned Volunteer:</span>{" "}
                        {request.assignedTo?.name || "Not assigned yet"}
                      </div>

                      <div className="mb-4 text-sm text-[#6c757d]">
                        🔖 <span className="font-medium">Status:</span>{" "}
                        {request.status}
                      </div>

                      {isExpanded && (
                        <div className="mt-4 text-sm text-[#495057] space-y-2">
                          <div>
                            📝 <span className="font-medium">Description:</span>{" "}
                            {request.description}
                          </div>
                          <div>
                            📍 <span className="font-medium">Location:</span>{" "}
                            {request.user.location.address || "Not provided"},{" "}
                            {request.user.location.city || "Not provided"},{" "}
                            {request.user.location.state || "Not provided"}
                          </div>
                          <div>
                            🧑‍🦳{" "}
                            <span className="font-medium">Requested By:</span>{" "}
                            {request.user?.name} ({request.user?.email})
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row gap-8">
                      <button
                        onClick={() =>
                          setExpandedCardId(isExpanded ? null : request._id)
                        }
                        className="mt-6 px-5 py-2 bg-[#588157] text-white rounded-full hover:bg-[#3a5a40] transition"
                      >
                        {isExpanded ? "Hide Details" : "View Details"}
                      </button>
                      <button
                        onClick={() => handleCancelRequest(request._id)}
                        className="mt-6 px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                      >
                        Cancel Request
                      </button>{" "}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex-grow" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="book"
        className="bg-gradient-to-br from-[#d8f3dc] to-[#b7e4c7] min-h-screen py-12 px-8 md:px-20 flex flex-col md:flex-row scroll-mt-20 rounded-3xl ml-4 mr-4 mt-4 mb-4 shadow-xl"
      >
        <div className="flex-1 mb-6 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1b4332] mb-6">
            Need more help?
          </h2>
          <div className="bg-white/50 rounded-full p-8 shadow-sm mb-6">
            <p className="text-[#2d6a4f] text-[1.125rem] mb-4">
              Book a volunteer for any task. Just click below or ask your
              assistant. We’re here for you!
            </p>
            <ul className="list-disc pl-6 text-[#2d6a4f] text-[1.125rem]">
              <li>Companionship visits</li>
              <li>Minor home support</li>
              <li>Reading sessions or tech help</li>
            </ul>
          </div>
          <button
            className="px-6 py-3 bg-[#40916c] text-white rounded-full hover:bg-[#1a7431]"
            onClick={handleBookClick}
          >
            Book a Volunteer
          </button>
        </div>
        <div className="flex-1 flex justify-end items-center">
          <img
            src="/community.png"
            alt="Volunteer assistance"
            className="w-full max-w-sm animate-float drop-shadow-md"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ElderDashboard;
