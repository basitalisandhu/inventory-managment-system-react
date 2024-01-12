import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import CustomerAccountBook from "../../Components/AccountBook/CustomerAccountBook";
import SupplierAccountBook from "../../Components/AccountBook/SupplierAccountBook";
import Bill from "../../Components/Bill/Bill";
import Dashboard from "../../Components/Dashboard/Dashboard";
import PayoffPayments from "../../Components/Payments/PayoffPaymetns";
import ReceivedPayments from "../../Components/Payments/ReceivedPayments";
import AddProducts from "../../Components/Products/AddProducts";
import ViewProducts from "../../Components/Products/ViewProducts";
import AddPurchase from "../../Components/Purchases/AddPurchase";
import PurchasedItems from "../../Components/Purchases/PurchasedItems";
import PurchaseHistory from "../../Components/Purchases/PurchaseHistory";
import PurchaseReturn from "../../Components/Purchases/PurchaseReturn";
import SaleHistory from "../../Components/Sales/SaleHistory";
import SalesReturn from "../../Components/Sales/SalesReturn";
import SideMenu from "../../Components/SideMenu";
import AddProductStock from "../../Components/Stock/AddProductStock";
import Stock from "../../Components/Stock/Stock";
import AddSuppliers from "../../Components/Suppliers/AddSuppliers";
import ViewSuppliers from "../../Components/Suppliers/ViewSuppliers";
import MobileMenu from "../../Components/MobileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice, faJarWheat } from "@fortawesome/free-solid-svg-icons";
import {
  AccountBookIcon,
  DashboardIcon,
  PaymentsIcon,
  PurchaseIcon,
  SalesIcon,
  SupplierIcon,
  ProductsIcon,
} from "../../Components/Icon";

import "./style.scss";
import UpdateProductStock from "../../Components/Stock/UpdateProductStock";

const LoggedHome = () => {
  return (
    <>
      <div class="loggedHome-wrapper flex flex-wrap justify-between  w-full h-full">
        <div className="loggedHome-inner-wrapper w-[5%] sticky left-0">
          <div className="h-screen sticky left-0 mobile-menu-wrapper w-[100%] flex justify-start items-center flex-col">
            <div className="icon">
              <DashboardIcon />
            </div>
            <div className="icon">
              <Link
                to="bill"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faFileInvoice} />
                {/* <span class="ml-3">Bill</span> */}
              </Link>
            </div>
            <div className="icon">
              <Link to={"/dashboard/view-stock"}>
                <FontAwesomeIcon icon={faJarWheat} />{" "}
              </Link>
            </div>
            <div className="icon">
              <Link to={"/dashboard/sale-history"}>
                <SalesIcon />
              </Link>
            </div>
            <div className="icon">
              <Link to={"/dashboard/add-purchase"}>
                <PurchaseIcon />
              </Link>
            </div>
            <div className="icon">
              <Link to={"/dashboard/products"}>
                <ProductsIcon />
              </Link>
            </div>
            <div className="icon">
              <Link to={"/dashboard/suppliers"}>
                <SupplierIcon />
              </Link>
            </div>
            <div className="icon">
              <PaymentsIcon />
            </div>
            <div className="icon">
              <AccountBookIcon />
            </div>
          </div>
        </div>
        <div class="side-menu w-[23%] bg-white rounded pl-3 m-0">
          <SideMenu />
        </div>
        <div class="ml-2 w-[70%] p-2 routes-dashboard">
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="bill" element={<Bill />} />

            {/* Stock */}
            <Route path="view-stock" element={<Stock />} />
            <Route path="add-stock" element={<AddProductStock />} />
            <Route
              path="view-stock/:productStockId"
              element={<UpdateProductStock />}
            />

            {/* Purchase */}
            <Route path="purchase-history" element={<PurchaseHistory />} />
            <Route
              path="purchase-history/:purchasedId"
              element={<AddPurchase />}
            />

            <Route path="purchased-items" element={<PurchasedItems />} />
            <Route path="add-purchase" element={<AddPurchase />} />
            <Route path="return-purchase" element={<PurchaseReturn />} />

            {/* Sales */}
            <Route path="sale-history" element={<SaleHistory />} />
            <Route path="sales-return" element={<SalesReturn />} />

            {/* Purchase */}
            <Route path="purchase-history" element={<PurchaseHistory />} />
            <Route path="purchased-items" element={<PurchasedItems />} />
            <Route path="add-purchase" element={<AddPurchase />} />
            <Route path="return-purchase" element={<PurchaseReturn />} />

            {/* Products */}
            <Route path="products" element={<ViewProducts />} />
            <Route path="add-products" element={<AddProducts />} />
            <Route path="products/:productId" element={<AddProducts />} />

            {/* Suppliers */}
            <Route path="suppliers" element={<ViewSuppliers />} />
            <Route path="add-suppliers" element={<AddSuppliers />} />
            <Route path="suppliers/:supplierId" element={<AddSuppliers />} />

            {/* Payments */}
            <Route path="received-payments" element={<ReceivedPayments />} />
            <Route path="payoff-payments" element={<PayoffPayments />} />

            {/* Account Book */}
            <Route
              path="customer-account-book"
              element={<CustomerAccountBook />}
            />
            <Route
              path="supplier-account-book"
              element={<SupplierAccountBook />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default LoggedHome;
