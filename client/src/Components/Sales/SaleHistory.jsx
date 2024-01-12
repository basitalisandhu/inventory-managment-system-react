import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Environments
import { BASE_URL, TOKEN } from "../../config/environment";

// Constants
import { API_URL } from "../../constants/ApiUrl";

// Components
import Loading from "../common/Loading/Loading";
import ButtonSecondary from "../common/ButtonSecondary/ButtonSecondary";
import { SalesContext } from "../../contexts/SalesContext";

// React Icons
import { FaTrash } from "react-icons/fa";

const SaleHistory = () => {
  const { loading, salesData, getSales, removeSales } =
    useContext(SalesContext);

  useEffect(function () {
    getSales();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <h1 className="mt-12 text-start sm:text-3xl text-2xl font-medium title-font text-gray-900">
        Sales History
      </h1>
      <p className="text-sm text-start">See the sales details information.</p>
      <div class="container px-5 py-6 mx-auto">
        {/* Sales Table */}

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-amber-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-6 w-1/12">
                  Customer
                </th>
                <th scope="col" class="px-6 py-6 w-1/12">
                  Date
                </th>
                <th scope="col" class="px-6 py-6 w-2/12">
                  Products
                </th>
                <th scope="col" class="px-6 py-6 w-1/12 text-center">
                  Sold Value
                </th>

                <th scope="col" class="px-6 py-6 w-1/12 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {salesData?.map((saleItem) => (
                <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {saleItem.customer}
                  </th>

                  <td class="px-6 py-4">{saleItem.created_at}</td>
                  <td class="px-6 py-4">{saleItem.total_price}</td>
                  <td class="px-6 py-4">{saleItem.details}</td>
                  <td className="px-6 py-4">
                    <div onClick={() => removeSales(saleItem.id)}>
                      <FaTrash />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <Link to={"/dashboard/sales-return"}>
              <ButtonSecondary text={"Sales Return"} type={"button"} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleHistory;
