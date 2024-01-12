import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Select from "react-dropdown-select";
import { BASE_URL, TOKEN } from "../../config/environment";
import { API_URL } from "../../constants/ApiUrl";
import { toast } from "react-toastify";
import Loading from "../common/Loading/Loading";

const UpdateProductStock = () => {
  const { productStockId } = useParams();

  const [products, setProducts] = useState([]);
  const [stockInfo, setStockInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (evnt) => {
    let data = { ...stockInfo };
    data[evnt.target.name] = evnt.target.value;
    setStockInfo(data);
  };

  const handleSelectOnChange = (singleProductArray) => {
    const productId = singleProductArray[0].value;
    const productName = singleProductArray[0].label;
    let data = { ...stockInfo };
    data["product"] = productId;
    data["product_name"] = productName;
    console.log(data);
    setStockInfo(data);
  };

  useEffect(() => {
    getProducts();
    if (productStockId) {
      // If productStockId exists, fetch the specific stock product details
      fetchStockProductDetails(productStockId);
    }
  }, []);

  async function fetchStockProductDetails(id) {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}${API_URL.STOCK}${id}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        // Set the retrieved stock product details to the state
        setStockInfo({
          unit_purchase_price: data.unit_purchase_price,
          unit_selling_price: data.unit_selling_price,
          quantity: data.quantity,
          // Set other properties accordingly
        });
      } else {
        console.error("Request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
    }
  }

  async function getProducts() {
    console.log(TOKEN);
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}${API_URL.PRODUCTS}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        setProducts(data?.results);
      } else {
        console.error("Request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProductStock() {
    // Send the updated data to update
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}${API_URL.STOCK}${productStockId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(stockInfo),
        }
      );
      setLoading(false);

      // Check for succesfull request
      if (response.status === 200) {
        toast.success("Product update successfull!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/dashboard/products");
      } else {
        toast.error("Prodcut update failed!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading && <Loading />}
      <h1 className="text-4xl mb-4 font-semi-bold color-purple-700">
        Update Product Stock
      </h1>
      <p>Update stock detail</p>
      <div className="container px-5 py-6 mx-auto">
        <div className="flex my-2">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            Product
          </span>
          <Select
            // style={{ "min-width": "200px" }}
            options={products.map((product) => ({
              value: product.id,
              label: product.name,
            }))}
            className="text-start w-100"
            onChange={handleSelectOnChange}
            // disabled={productStockId ? true : false}
          />
        </div>
        <div className="flex my-2">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            Purchase Price (per unit)
          </span>
          <input
            type="number"
            id="website-admin"
            name="unit_purchase_price"
            value={stockInfo.unit_purchase_price}
            onChange={handleOnChange}
            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex my-2">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            Selling Price (per unit)
          </span>
          <input
            type="number"
            id="website-admin"
            name="unit_selling_price"
            value={stockInfo.unit_selling_price}
            onChange={handleOnChange}
            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex my-2">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            Quantity
          </span>
          <input
            type="number"
            id="website-admin"
            name="quantity"
            value={stockInfo.quantity}
            onChange={handleOnChange}
            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex my-2 justify-start">
          <button
            type="button"
            onClick={updateProductStock}
            class="mt-8 focus:outline-none text-white bg-orange-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-12 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Update Stock
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductStock;
