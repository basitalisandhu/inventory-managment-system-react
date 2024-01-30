import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUnitModal from "../common/AddUnitModal";

import { BASE_URL, TOKEN } from "../../config/environment";
import { API_URL } from "../../constants/ApiUrl";

import ButtonSecondary from "../../Components/common/ButtonSecondary/ButtonSecondary";

import Loading from "../../Components/common/Loading/Loading";

const AddProducts = () => {
  const [productInfo, setProductInfo] = useState({});
  const [units, setUnits] = useState([]);
  const { productId } = useParams();
  const unitUrl = `http://127.0.0.1:8000/units/`;
  const productsUrl = `http://127.0.0.1:8000/products/`;
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (evnt) => {
    const field = evnt.target.name;
    const value = evnt.target.value;
    let newData = { ...productInfo };
    newData[field] = value;
    setProductInfo(newData);
  };

  const handleAddProduct = async () => {
    console.log(productInfo, "line 31...");
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}${API_URL.PRODUCTS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(productInfo),
      });

      if (response.ok) {
        setLoading(false);
        toast.success("Products successfully added");
        navigate("/dashboard/products");
        console.log("Request succeeded:", response);
      } else {
        console.error("Request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async () => {
    // Send the updated data to update
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}${API_URL.PRODUCTS}${productId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${TOKEN}`,
          },
          body: JSON.stringify(productInfo),
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
        setProductInfo(productInfo);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load units from the server
    getUnits();
  }, [unitUrl, productId, productsUrl]);

  async function getUnits() {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}${API_URL.UNIT}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${TOKEN}`,
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        setUnits(data?.results);
      } else {
        console.error("Request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <h1 className="mt-8 text-start sm:text-3xl text-xl font-medium title-font text-gray-900">
        {" "}
        {productId ? "Update product" : "New product"}
      </h1>
      <p className="text-md text-start">
        Add new products with details information.
      </p>
      <div className="container px-5 py-6 mx-auto">
        {/* product selection */}
        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              Name
            </span>
            <input
              type="text"
              id="website-admin"
              name="name"
              value={productInfo.name}
              onChange={handleOnChange}
              className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Product name"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              Brand
            </span>
            <input
              type="text"
              id="website-admin"
              name="brand"
              value={productInfo.brand}
              onChange={handleOnChange}
              className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Product brand"
            />
          </div>

          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              Unit
            </span>
            <select
              id="underline_select"
              name="unit"
              value={productInfo.unit}
              onChange={handleOnChange}
              className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {units.length
                ? units.map((unit, idx) => (
                    <option key={idx} value={unit.id}>
                      {unit.title}
                    </option>
                  ))
                : ""}
            </select>
            {/* <!-- Modal toggle --> */}
            <button
              data-modal-target="addUnitModal"
              data-modal-toggle="addUnitModal"
              class="m-2 md:my-0 md:mx-2 block text-white bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Add New Unit
            </button>
            <AddUnitModal />
          </div>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start"
          >
            Product Details
          </label>
          <textarea
            id="message"
            name="detail"
            value={productInfo.detail}
            onChange={handleOnChange}
            rows="4"
            className="block p-2.5 md:w-1/2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
      </div>

      <div className="py-4 flex justify-center items-center w-[30%]">
        <ButtonSecondary
          onClick={productId ? handleUpdateProduct : handleAddProduct}
          type="button"
          text={productId ? "UPDATE PRODUCT" : "ADD PRODUCT"}
        />
      </div>
    </>
  );
};

export default AddProducts;
