import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [mode, setMode] = useState("dark");
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "elderly",
    address: "",
    city: "",
    state: "",
    pincode: "",
    availability: "",
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const toggleMode = () => setMode(mode === "light" ? "dark" : "light");

  const validateRegister = () => {
    let err = {};
    if (!registerForm.name) err.name = "Name is required";
    if (!registerForm.email || !/\S+@\S+\.\S+/.test(registerForm.email))
      err.email = "Valid email required";
    if (!registerForm.phone || registerForm.phone.length < 10)
      err.phone = "Valid phone required";
    if (!registerForm.password || registerForm.password.length < 6)
      err.password = "Min 6 char password";
    return err;
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const err = validateRegister();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      setMsg("");
    } else {
      setErrors({});
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_NGROK_URL}/auth/signup`,
          {
            ...registerForm,
            location: {
              address: registerForm.address,
              city: registerForm.city,
              state: registerForm.state,
              pincode: registerForm.pincode,
            },
            availability: registerForm.availability
              ? registerForm.availability.split(",").map((x) => x.trim())
              : [],
          }
        );
        const loginRes = await axios.post(
          `${process.env.REACT_APP_NGROK_URL}/auth/login`,
          {
            email: registerForm.email,
            password: registerForm.password,
          }
        );

        localStorage.setItem("authToken", loginRes.data.token);
        setMsg("✅ Signup successful!");
        setTimeout(() => {
          navigate("/ElderDashboard");
        }, 100);
      } catch (error) {
        setMsg("❌ " + (error.response?.data?.error || "Signup failed"));
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_NGROK_URL}/auth/login`,
        loginForm
      );
      localStorage.setItem("authToken", res.data.token);
      setMsg("✅ Login successful!");
      setTimeout(() => {
        navigate("/ElderDashboard");
      }, 100);
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.error || "Login failed"));
    }
  };

  const isDark = mode === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white"
          : "bg-gradient-to-br from-[#b5d5ff] via-[#dceeff] to-[#b5d5ff] text-[#1e1e1e]"
      } p-6 flex items-center justify-center`}
    >
      <div className="absolute top-4 left-6">
        <a
          href="/"
          className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm shadow hover:scale-105 transition"
        >
          ← Back
        </a>
      </div>

      <div className="absolute top-4 right-6">
        <button
          onClick={toggleMode}
          className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm shadow hover:scale-105 transition"
        >
          {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 rounded-2xl p-8 backdrop-blur-md ${
          isDark
            ? "bg-white/10 border border-white/30"
            : "bg-white/40 border border-white/50"
        } shadow-2xl`}
      >
        {/* Register Section */}
        <div>
          <h2 className="text-3xl font-bold mb-4">🌱 Register</h2>
          <form
            onSubmit={handleRegisterSubmit}
            className="grid grid-cols-1 gap-4"
          >
            <input
              name="name"
              placeholder="Full Name"
              value={registerForm.name}
              onChange={handleRegisterChange}
              className="p-3 border rounded-xl bg-white/60 text-black"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name}</p>
            )}

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={handleRegisterChange}
              className="p-3 border rounded-xl bg-white/60 text-black"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}

            <input
              name="phone"
              type="tel"
              placeholder="Phone"
              value={registerForm.phone}
              onChange={handleRegisterChange}
              className="p-3 border rounded-xl bg-white/60 text-black"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm">{errors.phone}</p>
            )}

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={handleRegisterChange}
              className="p-3 border rounded-xl bg-white/60 text-black"
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password}</p>
            )}

            <select
              name="role"
              value={registerForm.role}
              onChange={handleRegisterChange}
              className="p-3 border rounded-xl bg-white/60 text-black"
            >
              <option value="elderly">Elderly</option>
              <option value="volunteer">Volunteer</option>
              <option value="admin">Admin</option>
            </select>

            <input
              name="address"
              placeholder="Address"
              value={registerForm.address}
              onChange={handleRegisterChange}
              className="p-3 border rounded-xl bg-white/60 text-black"
            />
            <input
              name="city"
              placeholder="City"
              value={registerForm.city}
              onChange={handleRegisterChange}
              className="p-3 border rounded-xl bg-white/60 text-black"
            />
            <input
              name="state"
              placeholder="State"
              value={registerForm.state}
              onChange={handleRegisterChange}
              className="p-3 border rounded-xl bg-white/60 text-black"
            />
            <input
              name="pincode"
              placeholder="Pincode"
              value={registerForm.pincode}
              onChange={handleRegisterChange}
              className="p-3 border rounded-xl bg-white/60 text-black"
            />

            <textarea
              name="availability"
              placeholder="Availability (e.g., Monday Morning)"
              value={registerForm.availability}
              onChange={handleRegisterChange}
              className="p-3 border rounded-xl bg-white/60 text-black"
            ></textarea>

            <button
              type="submit"
              className="bg-[#00897b] text-white py-3 px-6 rounded-xl hover:bg-[#00776d] transition"
            >
              Register Now
            </button>
          </form>
        </div>

        {/* Login Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">🔐 Login</h2>
            <p className="mb-4 text-sm opacity-90">
              Already have an account? Log in to manage your ConnectWell profile
              and requests.
            </p>
            <form
              onSubmit={handleLoginSubmit}
              className="grid grid-cols-1 gap-4"
            >
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={handleLoginChange}
                className="p-3 border rounded-xl bg-white/60 text-black"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={handleLoginChange}
                className="p-3 border rounded-xl bg-white/60 text-black"
              />
              <button
                type="submit"
                className="bg-[#3b82f6] text-white py-3 px-6 rounded-xl hover:bg-[#2563eb] transition"
              >
                Login
              </button>
            </form>
          </div>
          <p className="text-xs mt-8 opacity-60">
            © ConnectWell {new Date().getFullYear()}
          </p>
        </div>
      </motion.div>

      {/* Feedback Message */}
      {msg && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur px-6 py-3 rounded-xl shadow text-sm text-center">
          {msg}
        </div>
      )}
    </div>
  );
};

export default Register;
