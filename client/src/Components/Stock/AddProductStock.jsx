import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-dropdown-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BASE_URL, TOKEN } from "../../config/environment";
import { API_URL } from "../../constants/ApiUrl";
import Loading from "../common/Loading/Loading";

const AddProductStock = async () => {
  const { productStockId } = useParams();

  const [products, setProducts] = useState([]);
  const [stockInfo, setStockInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSelectOnChange = (singleProductArray) => {
    const productId = singleProductArray[0].value;
    const productName = singleProductArray[0].label;
    let data = { ...stockInfo };
    data["product"] = productId;
    setStockInfo(data);
  };

  const handleOnChange = (evnt) => {
    let data = { ...stockInfo };
    data[evnt.target.name] = evnt.target.value;
    setStockInfo(data);
  };

  const addProudctStock = async () => {
    const data = { ...stockInfo };
    data["quantity"] = parseInt(data.quantity);
    console.log(data, "line 35..");

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}${API_URL.STOCK}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(data),
      });

      if (response) {
        setLoading(false);
        toast.success("Product Stock added successfully");
        navigate("/dashboard/view-stock");
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

  function updateProductStock() {
    console.log("update");
  }

  // async function updateProductStock() {
  //   const data = { ...stockInfo };
  //   data["quantity"] = parseInt(data.quantity);
  //   console.log(data, "line 70");

  //   // try {
  //   //   setLoading(true);
  //   //   const response = await fetch(
  //   //     `${BASE_URL}${API_URL.STOCK}${productStockId}`,
  //   //     {
  //   //       method: "PUT",
  //   //       headers: {
  //   //         Authorization: `Bear ${TOKEN}`,
  //   //         "Content-Type": "application/json",
  //   //       },
  //   //       body: JSON.stringify(data),
  //   //     }
  //   //   );
  //   //   setLoading(false);

  //   //   if (response.status === 200) {
  //   //     setStockInfo({});
  //   //     toast.success("Product stock update successfull!", {
  //   //       position: toast.POSITION.TOP_RIGHT,
  //   //     });
  //   //   } else {
  //   //     toast.error("Product stock update failed!", {
  //   //       position: toast.POSITION.TOP_RIGHT,
  //   //     });
  //   //   }
  //   // } catch (error) {
  //   //   toast.error(error.message);
  //   // } finally {
  //   //   setLoading(false);
  //   // }
  // }

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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <h1 className="mt-12 text-start sm:text-3xl text-xl font-medium title-font text-gray-900">
        Add Product Stock
      </h1>
      <p className="text-md text-start">
        Add new product stock with details information.
      </p>
      {/* <form onSubmit={handleAddSupplierSubmit}> */}
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
            disabled={productStockId ? true : false}
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
            onClick={addProudctStock}
            class="mt-8 focus:outline-none text-white bg-orange-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-12 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProductStock;
