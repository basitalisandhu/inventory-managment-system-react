import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SupplierTableRow from "./SupplierTableRow";

import { BASE_URL, TOKEN } from "../../config/environment";
import { API_URL } from "../../constants/ApiUrl";
import Loading from "../common/Loading/Loading";
import { Link } from "react-router-dom";
import ButtonSecondary from "../common/ButtonSecondary/ButtonSecondary";

const ViewSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  const removeSupplier = async (supplierId) => {
    console.log(supplierId);
    const url = `${BASE_URL}${API_URL.SUPPLIER}${supplierId}/`;
    if (window.confirm("Are you sure to remove the Supplier?") === true) {
      const response = await fetch(url, {
        method: "DELETE",
        Authorization: `Bearer ${TOKEN}`,
      });
      if (response) {
        const newSuppliers = suppliers.filter(
          (supplier) => supplier.id !== supplierId
        );
        console.log(newSuppliers, "line 29 ");
        setSuppliers(newSuppliers);

        toast.success("Supplier removed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  async function getSuppliers() {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}${API_URL.SUPPLIER}`, {
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
        setSuppliers(data?.results);
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
      <h1 className=" mt-8 text-start sm:text-3xl text-2xl font-medium title-font text-gray-900">
        Suppliers
      </h1>
      <p className="text-md text-start">
        See the supplier details and update if require.
      </p>

      <div className="mt-4">
        <Link to={"/dashboard/add-suppliers"}>
          <ButtonSecondary text={"Add New Supplier"} type={"button"} />
        </Link>
      </div>

      <ToastContainer />

      <div className="container px-5 py-6 mx-auto">
        {/* Product Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-amber-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-6 w-1/12">
                  Supplier Code
                </th>
                <th scope="col" className="px-6 py-6 w-1/12">
                  Name
                </th>
                <th scope="col" className="px-6 py-6 w-1/12">
                  Designation
                </th>
                <th scope="col" className="px-6 py-6 w-2/12 text-center">
                  Contact
                </th>
                <th scope="col" className="px-6 py-6 w-1/12">
                  Contact 2
                </th>
                <th scope="col" className="px-6 py-6 w-1/12">
                  Email
                </th>
                <th scope="col" className="px-6 py-6 w-1/12">
                  Company
                </th>
                <th scope="col" className="px-6 py-6 w-2/12">
                  Address
                </th>
                <th scope="col" className="px-6 py-6 w-1/12">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {suppliers?.length > 0 ? (
                suppliers?.map((supplier) => (
                  <SupplierTableRow
                    key={supplier.id}
                    supplier={supplier}
                    removeSupplier={removeSupplier}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="p-4 text-center">
                    There is no supplier.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewSuppliers;
