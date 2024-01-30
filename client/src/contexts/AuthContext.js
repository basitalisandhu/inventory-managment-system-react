import { createContext, useState } from "react";

// Environment
import { BASE_URL, TOKEN, REFRESH_TOKEN } from "../config/environment";

// Constants
import { API_URL } from "../constants/ApiUrl";

// React-Toastify
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function login(data) {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}${API_URL.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setLoading(false);
        setAuthenticated(true);
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
      setAuthenticated(true);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}${API_URL.LOGOUT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${REFRESH_TOKEN}`,
        },
        // body: JSON.stringify(supplierData),
      });

      if (response) {
        setLoading(false);
        toast.success("Logout successfully");
        navigate("/login");
        setAuthenticated(false);
        console.log("Request succeeded:", response);
      } else {
        console.error("Request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
      setAuthenticated(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        loading,
        authenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
