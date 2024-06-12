import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
// import { useAlert } from "react-alert";
import logo from "../img/whitemainlogo-1.webp";
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const response = await axios.post("/auth/login", { username, password });
      const { token, role } = response.data;
  
      // Save the token to local storage or state management
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Navigate to the next page
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-3/5 bg-purple flex items-center justify-center">
        <div className="text-center">
          <img src={logo} alt="Phoenix Media Omniverse" className="mx-auto mb-4 w-2/5" />
        </div>
      </div>
      <div className="w-2/5 flex items-center justify-center text-start bg-gray-50">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-2">Hello Again!</h2>
          <p className="mb-8">Welcome Back</p>
          <form onSubmit={handleSubmit}>
            {error && <div className="text-[red] mb-4">{error}</div>}
            <div className="relative mb-6">
              <input
                type="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg w-full border border-gray"
                placeholder="Username"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center opacity-60 pointer-events-none">
                <MdOutlineEmail />
              </div>
            </div>
            <div className="relative mb-6">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg w-full border border-gray"
                placeholder="Password"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center opacity-60 pointer-events-none">
                <FaLock />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full items-center">
                <button
                  type="submit"
                  className="bg-lightpurple hover:bg-purple text-white text-center font-semibold mb-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Login
                </button>
                <a
                  href="#"
                  className="flex justify-center font-light text-sm text-lightpurple hover:text-purple"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
