import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

// Components
import ProductTableRow from "./ProductTableRow";
import Loading from "../common/Loading/Loading";
import ButtonSecondary from "../common/ButtonSecondary/ButtonSecondary";

// React Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Constants & Environments
import { BASE_URL, REFRESH_TOKEN, TOKEN } from "../../config/environment";
import { API_URL } from "../../constants/ApiUrl";
import { Link } from "react-router-dom";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { authenticated } = useContext(AuthContext);

  const removeProduct = async (productId) => {
    const url = `${BASE_URL}${API_URL.PRODUCTS}${productId}/`;
    if (window.confirm("Are you sure to remove the product?") === true) {
      const response = await fetch(url, {
        method: "DELETE",
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      });
      if (response) {
        const newProducts = products.filter(
          (product) => product.id !== productId
        );
        setProducts(newProducts);

        toast.success("Supplier removed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  useEffect(() => {
    // Load data from the server
    getProducts();
  }, []);

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

  return (
    <>
      {loading && <Loading />}
      <h1 className="mt-8 text-start sm:text-3xl text-2xl font-medium title-font text-gray-900">
        Products
      </h1>
      <p className="text-md text-start">See the product details</p>
      <div className="mt-4">
        <Link to={"/dashboard/add-products"}>
          <ButtonSecondary text={"Add New Products"} type={"button"} />
        </Link>
      </div>
      <div className="container px-5 py-6 mx-auto">
        {/* Product Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-amber-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-6 w-2/12">
                  Code
                </th>
                <th scope="col" className="px-6 py-6 w-2/12">
                  Name
                </th>
                <th scope="col" className="px-6 py-6 w-2/12">
                  Brand
                </th>
                <th scope="col" className="px-6 py-6 w-1/12 text-center">
                  Unit
                </th>
                <th scope="col" className="px-6 py-6 w-4/12">
                  Details
                </th>
                <th scope="col" className="px-6 py-6 w-1/12">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length ? (
                products.map((product) => (
                  <ProductTableRow
                    key={product.id}
                    product={product}
                    removeProduct={removeProduct}
                  />
                ))
              ) : (
                <tr className="p-2">
                  <th>There is no product.</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toaster to show confirmation message */}
      <ToastContainer />
    </>
  );
};

export default ViewProducts;
