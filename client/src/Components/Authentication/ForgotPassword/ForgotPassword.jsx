import React, { useState } from "react";
import "./style.scss";

import forgotImg from "../../../images/forgotPassword.jpg";
import ButtonSecondary from "../../common/ButtonSecondary/ButtonSecondary";
import { Link } from "react-router-dom";
import forgotBg from "../../../images/forgot-bg.png";
import { BASE_URL, TOKEN } from "../../../config/environment";
import { API_URL } from "../../../constants/ApiUrl";
import Loading from "../../common/Loading/Loading";

import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(email);

    try {
      const patchData = { email }; // Payload for PATCH request

      setLoading(true);
      const response = await fetch(
        `${BASE_URL}${API_URL.PASSWORD_RESET_CONFIRM}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(patchData),
        }
      );
      setLoading(false);

      if (response.ok) {
        toast.success("Email sent");
      } else {
        console.error("Failed to update email");
      }
    } catch (error) {
      console.error("Error occurred while sending PATCH request:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="forgot-password-wrapper">
      {loading && <Loading />}
      <h1 className="mt-12 text-4xl">Forgot Password</h1>

      <div className="forgot-password-container">
        <img src={forgotImg} alt={forgotImg} />
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Email"
            className="mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ButtonSecondary type={"submit"} text={"Change Password"} />
        </form>
        <div className="mt-4">
          <Link to={"/login"}>Discard</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
