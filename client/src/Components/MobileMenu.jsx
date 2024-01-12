import React from "react";
import {
  AccountBookIcon,
  DashboardIcon,
  PaymentsIcon,
  ProductsIcon,
  PurchaseIcon,
  SalesIcon,
  SupplierIcon,
} from "./Icon";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice, faJarWheat } from "@fortawesome/free-solid-svg-icons";

import "./style.scss";
const MobileMenu = () => {
  return (
    <div className="mobile-menu-wrapper border-2 w-[5%] flex justify-between items-center flex-col h-[100vh]">
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
        <FontAwesomeIcon icon={faJarWheat} />{" "}
      </div>
      <div className="icon">
        <SalesIcon />
      </div>
      <div className="icon">
        <PurchaseIcon />
      </div>
      <div className="icon">
        <SupplierIcon />
      </div>
      <div className="icon">
        <PaymentsIcon />
      </div>
      <div className="icon">
        <AccountBookIcon />
      </div>
    </div>
  );
};

export default MobileMenu;
