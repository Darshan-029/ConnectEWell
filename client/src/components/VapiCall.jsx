import React, { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import { Mic, PhoneOff } from "lucide-react";

const apiKey = process.env.REACT_APP_API_KEY;
const assistantId = process.env.REACT_APP_ASSISTANT_ID;

const VapiCallComponent = () => {
  const [vapi, setVapi] = useState(null);
  const [status, setStatus] = useState("Idle");
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState("0s");
  const [callActive, setCallActive] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);

  useEffect(() => {
    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);

    let statusTimeout;

    vapiInstance.on("call-start", () => {
      setStatus("Connecting");
      setCallActive(true);
      setStartTime(Date.now());

      statusTimeout = setTimeout(() => {
        setStatus("Listening");
      }, 3000);
    });

    vapiInstance.on("call-end", () => {
      clearTimeout(statusTimeout);
      setStatus("Call Ended");
      setCallActive(false);
      setStartTime(null);
      setElapsed("0s");
      setTimeout(() => setStatus("Idle"), 3000);
      setShowBookingConfirmation(true);
      setTimeout(() => setShowBookingConfirmation(false), 4000);
    });

    vapiInstance.on("error", (err) => {
      console.error("Vapi error:", err);
      clearTimeout(statusTimeout);
      setStatus("Error");
      setCallActive(false);
      setStartTime(null);
      setElapsed("0s");

      setTimeout(() => setStatus("Idle"), 3000);
    });

    return () => {
      vapiInstance.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token from localStorage:", token);

    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.userId;
      console.log("Decoded userId:", userId);

      if (userId) {
        fetch(`${process.env.REACT_APP_NGROK_URL}/email/setTempUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        })
          .then((res) => res.json())
          .then((data) => console.log("Temporary user set:", data))
          .catch((err) => console.error("Failed to set temp user", err));
      }
    }
  }, []);

  // Timer updater
  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        const seconds = Math.floor((Date.now() - startTime) / 1000);
        setElapsed(`${seconds}s`);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime]);

  const handleCallToggle = () => {
    if (!callActive && vapi) {
      vapi.start(assistantId);
    } else if (callActive && vapi) {
      vapi.stop();
    }
  };

  const getButtonColor = () => {
    switch (status) {
      case "Connecting":
        return "bg-blue-500 ring-blue-300 animate-pulse";
      case "Listening":
        return "bg-green-500 ring-green-300 animate-pulse";
      case "Call Ended":
      case "Error":
        return "bg-red-500 ring-red-300 animate-pulse";
      default:
        return "bg-gray-600 ring-gray-400";
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] min-h-screen p-10 font-sans flex flex-col items-center relative">
      <div className="absolute top-4 left-6">
        <a
          href="/dashboard"
          className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-white text-sm shadow hover:scale-105 transition"
        >
          ← Back
        </a>
      </div>
      <h1 className="text-5xl font-bold text-white mb-4">
        Companion Voice Assistant
      </h1>

      <p className="text-white/80 mt-6 mb-6 bg-white/10 px-6 py-4 rounded-full border border-white/20 text-center max-w-xl">
        Click the mic button to request for help.
      </p>

      {status && (
        <div className="text-white/90 text-2xl mb-6">
          <span className="font-semibold">{status}</span>
          {startTime && (
            <span className="ml-4">
              Duration: <span className="font-mono">{elapsed}</span>
            </span>
          )}
        </div>
      )}

      <div className="relative bg-white/10 backdrop-blur-xl text-white px-6 py-6 mt-8 rounded-2xl border border-white/20 text-center max-w-2xl shadow-2xl group transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
        {/* Gradient Border Effect */}
        <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 blur-xl opacity-30 group-hover:opacity-60 transition-all z-[-1]"></div>

        <h2 className="text-2xl font-bold mb-4 drop-shadow">
          💡 What You Can Say
        </h2>

        <ul className="list-none text-left space-y-3 text-white/90">
          <li className="flex items-center gap-3">
            <span className="text-pink-300">🎤</span>
            <span>"I need help with groceries."</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-pink-300">🎤</span>
            <span>"Can someone assist me with medicines?"</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-pink-300">🎤</span>
            <span>"What volunteers are available today?"</span>
          </li>
        </ul>
      </div>
      {showBookingConfirmation && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg animate-bounce ring-2 ring-green-200">
            ✅ Volunteer has been booked!
          </div>
        </div>
      )}

      {status === "Listening" && (
        <div className="flex gap-1 mb-6 mt-14">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-5 h-32 bg-green-400 rounded-sm animate-wave"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      )}

      {/* Floating Call Button */}
      <button
        onClick={handleCallToggle}
        className={`fixed top-16 right-12 z-50 w-40 h-40 rounded-full shadow-2xl 
        flex items-center justify-center text-white transition-all duration-500 
        ring-4 ${getButtonColor()} animate-float-pulse`}
      >
        {callActive ? <PhoneOff size={32} /> : <Mic size={32} />}
      </button>
      <footer className="text-sm text-white/60 mt-10 fixed bottom-1">
        Powered by ConnectWell • @2025 All Rights Reserved
      </footer>
    </div>
  );
};

export default VapiCallComponent;
