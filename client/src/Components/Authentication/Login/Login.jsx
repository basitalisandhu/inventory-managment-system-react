import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./style.scss";

import { AuthContext } from "../../../contexts/AuthContext";

import { useContext } from "react";

// Images
import loginImg from "../../../images/login.jpg";

// Antd
import { Form } from "antd";

// Components
import ButtonSecondary from "../../../Components/common/ButtonSecondary/ButtonSecondary";
import GoogleButton from "../../common/GoogleButton/GoogleButton";
import Loading from "../../common/Loading/Loading";

// environments
import { BASE_URL, TOKEN } from "../../../config/environment";

// Constants
import { API_URL } from "../../../constants/ApiUrl";

// React Toastify
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEye, setShowEye] = useState(false);
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, loading } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Enter credentials");
    }

    const data = {
      email: email,
      password: password,
    };

    login(data);
  }

  return (
    <>
      {loading && <Loading />}
      <div className="login-wrapper">
        {/* login-left */}
        <div className="login-left">
          <img src={loginImg} alt={loginImg} className="login-img" />
        </div>
        <div className="login-right ">
          <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span class="ml-3 text-xl">Invento Might</span>
          </a>
          <h1>Login</h1>
          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <p>Email</p>
              <input
                type="text"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4 mb-4 relative">
              <p>Passowrd</p>

              <input
                type="password"
                placeholder="Enter Name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <ButtonSecondary text={"LOGIN"} type={"submit"} />

            <div className="mt-4">
              <GoogleButton />
            </div>
            <div className="links-group my-4">
              <Link to="/signup" className="font-bold">
                Sign up Instead?
              </Link>
              <Link to="/forgot-password" className="font-bold">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
