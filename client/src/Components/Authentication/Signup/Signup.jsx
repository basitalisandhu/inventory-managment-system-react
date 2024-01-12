import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./style.scss";

// Images
import signupImg from "../../../images/signup.jpg";

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

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEye, setShowEye] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Enter credentials");
    }

    const data = {
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}${API_URL.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setLoading(false);
        toast.success("login successfully");
        navigate("/dashboard");
        console.log("Request succeeded:", response);
      } else {
        toast.error("Bad network");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className="signup-wrapper">
        {/* login-left */}
        <div className="signup-left">
          <img src={signupImg} alt={signupImg} className="signup-img" />
        </div>
        <div className="signup-right ">
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
          <h1>Sign Up</h1>
          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <p>First Name</p>
              <input type="text" placeholder="Enter first Name" />
            </div>

            <div className="mt-4">
              <p>Last Name</p>
              <input type="text" placeholder="Enter Last Name" />
            </div>
            <div className="mt-4">
              <p>Email</p>
              <input type="text" placeholder="Enter Email Address" />
            </div>
            <div className="mt-4 mb-4 relative">
              <p>Passowrd</p>

              <input
                type="text"
                placeholder="Enter Name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <ButtonSecondary text={"Sign Up"} type={"submit"} />

            <div className="mt-4">
              <GoogleButton />
            </div>
            <div className="links-group my-4">
              <Link to="/login" className="font-bold">
                Already have an account?
              </Link>
              <Link to="/login" className="font-bold">
                Discard
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
