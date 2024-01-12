import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice, faJarWheat } from "@fortawesome/free-solid-svg-icons";
import {
  AccountBookIcon,
  DashboardIcon,
  PaymentsIcon,
  ProductsIcon,
  PurchaseIcon,
  SalesIcon,
  SupplierIcon,
} from "./Icon";
import { IoIosLogOut } from "react-icons/io";
import { BASE_URL, REFRESH_TOKEN } from "../config/environment";
import { API_URL } from "../constants/ApiUrl";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Loading from "./common/Loading/Loading";
import { AuthContext } from "../contexts/AuthContext";

const SideMenu = () => {
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout, loading } = useContext(AuthContext);

  async function handleLogout() {
    logout();
  }

  return (
    <>
      <aside class="h-[100vh] fixed w-[22%]" aria-label="Sidebar">
        <div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
          <div class="flex items-center space-x-4 p-2 mb-5">
            <h1 className="text-2xl">Invento Might</h1>
          </div>
          <ul class="space-y-2">
            {/* Dashboard */}
            <li className="text-left border-b-2 pb-2">
              <button
                className="flex justify-center items-center text-2xl text-orange-700"
                onClick={handleLogout}
              >
                <span className="mr-2">
                  <IoIosLogOut />
                </span>
                Logout
              </button>
            </li>

            {/* Bill */}
            <li>
              <Link
                to="bill"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faFileInvoice} />
                <span class="ml-3">Bill</span>
              </Link>
            </li>

            {/* Stock */}
            <li>
              <button
                type="button"
                class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-stock"
                data-collapse-toggle="dropdown-stock"
              >
                <FontAwesomeIcon icon={faJarWheat} />
                <span
                  class="flex-1 ml-3 text-left whitespace-nowrap"
                  sidebar-toggle-item
                >
                  Stock
                </span>
                <svg
                  sidebar-toggle-item
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-stock" class="hidden py-2 space-y-2">
                <li>
                  <Link
                    to="view-stock"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    View Stock
                  </Link>
                </li>
                <li>
                  <Link
                    to="add-stock"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Add Stock
                  </Link>
                </li>
              </ul>
            </li>

            {/* Sales */}
            <li>
              <button
                type="button"
                class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <SalesIcon />
                <span
                  class="flex-1 ml-3 text-left whitespace-nowrap"
                  sidebar-toggle-item
                >
                  Sales
                </span>
                <svg
                  sidebar-toggle-item
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-example" class="hidden py-2 space-y-2">
                <li>
                  <Link
                    to="sale-history"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Sale History
                  </Link>
                </li>
                <li>
                  <Link
                    to="sales-return"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Sale Return
                  </Link>
                </li>
              </ul>
            </li>

            {/* Purchase */}
            <li>
              <button
                type="button"
                class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example2"
                data-collapse-toggle="dropdown-example2"
              >
                <PurchaseIcon />
                <span
                  class="flex-1 ml-3 text-left whitespace-nowrap"
                  sidebar-toggle-item
                >
                  Purchase
                </span>
                <svg
                  sidebar-toggle-item
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-example2" class="hidden py-2 space-y-2">
                <li>
                  <Link
                    to="purchase-history"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Purchase History
                  </Link>
                </li>
                <li>
                  <Link
                    to="purchased-items"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Purchased Items
                  </Link>
                </li>
                <li>
                  <Link
                    to="add-purchase"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Add Purchase
                  </Link>
                </li>
                <li>
                  <Link
                    to="return-purchase"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Return Purchase
                  </Link>
                </li>
              </ul>
            </li>

            {/* Products */}
            <li>
              <button
                type="button"
                class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example3"
                data-collapse-toggle="dropdown-example3"
              >
                <ProductsIcon />
                <span
                  class="flex-1 ml-3 text-left whitespace-nowrap"
                  sidebar-toggle-item
                >
                  Products
                </span>
                <svg
                  sidebar-toggle-item
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-example3" class="hidden py-2 space-y-2">
                <li>
                  <Link
                    to="products"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    View Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="add-products"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Add Products
                  </Link>
                </li>
              </ul>
            </li>

            {/* Suppliers */}
            <li>
              <button
                type="button"
                class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example4"
                data-collapse-toggle="dropdown-example4"
              >
                <SupplierIcon />
                <span
                  class="flex-1 ml-3 text-left whitespace-nowrap"
                  sidebar-toggle-item
                >
                  Suppliers
                </span>
                <svg
                  sidebar-toggle-item
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-example4" class="hidden py-2 space-y-2">
                <li>
                  <Link
                    to="suppliers"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    View Suppliers
                  </Link>
                </li>
                <li>
                  <Link
                    to="add-suppliers"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Add Suppliers
                  </Link>
                </li>
              </ul>
            </li>

            {/* Payments */}
            <li>
              <button
                type="button"
                class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example5"
                data-collapse-toggle="dropdown-example5"
              >
                <PaymentsIcon />
                <span
                  class="flex-1 ml-3 text-left whitespace-nowrap"
                  sidebar-toggle-item
                >
                  Payments
                </span>
                <svg
                  sidebar-toggle-item
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-example5" class="hidden py-2 space-y-2">
                <li>
                  <Link
                    to="received-payments"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Received Payments
                  </Link>
                </li>
                <li>
                  <Link
                    to="payoff-payments"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Payoff Payments
                  </Link>
                </li>
              </ul>
            </li>

            {/* Account Book */}
            <li>
              <button
                type="button"
                class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example6"
                data-collapse-toggle="dropdown-example6"
              >
                <AccountBookIcon />
                <span
                  class="flex-1 ml-3 text-left whitespace-nowrap"
                  sidebar-toggle-item
                >
                  Account Book
                </span>
                <svg
                  sidebar-toggle-item
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-example6" class="hidden py-2 space-y-2">
                <li>
                  <Link
                    to="customer-account-book"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Customer
                  </Link>
                </li>
                <li>
                  <Link
                    to="supplier-account-book"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Supplier
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideMenu;
