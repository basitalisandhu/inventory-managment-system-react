import { createContext, useState } from "react";

// Environment
import { BASE_URL, TOKEN } from "../config/environment";

// Constants
import { API_URL } from "../constants/ApiUrl";

// React-Toastify
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [salesData, setSalesData] = useState([]);

  // GET Sales History
  async function getSales() {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}${API_URL.SALES}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        console.log(data?.results, "line 24..");
        setSalesData(data?.results);
      } else {
        console.error("Request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
    }
  }

  // Remove Sales
  const removeSales = async (salesId) => {
    const url = `${BASE_URL}${API_URL.SALES}${salesId}/`;
    if (window.confirm("Are you sure to remove the product?") === true) {
      const response = await fetch(url, {
        method: "DELETE",
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      });
      if (response) {
        const newSales = salesData.filter((sale) => sale.id !== salesId);
        setSalesData(newSales);

        toast.success("Supplier removed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <SalesContext.Provider
      value={{
        getSales,
        removeSales,
        loading,
        salesData,
      }}
    >
      {children}
    </SalesContext.Provider>
  );

  // update Sales
  const updateSales = async () => {};
};
