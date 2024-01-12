import React, { lazy, Suspense, useContext } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

// React Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import MobileMenu from "./Components/MobileMenu";

import ProtectedRoute from "./Components/Authentication/ProtectedRoutes/ProtectedRoutes";

// Components
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/HomePage/Home";
import LoggedHome from "./Pages/HomePage/LoggedHome";
import NotFound from "./Pages/NotFound/NotFound";
// import Login from "./Components/Authentication/Login/Login";
import Loading from "./Components/common/Loading/Loading";
// import Signup from "./Components/Authentication/Signup/Signup";
// import ForgotPassword from "./Components/Authentication/ForgotPassword/ForgotPassword";

const Login = lazy(() => import("./Components/Authentication/Login/Login"));
const Signup = lazy(() => import("./Components/Authentication/Signup/Signup"));
const ForgotPassword = lazy(() =>
  import("./Components/Authentication/ForgotPassword/ForgotPassword")
);
// const LoggedHome = lazy(() => import("./Pages/HomePage/LoggedHome"));

function App() {
  const { authenticated } = useContext(AuthContext);
  console.log(authenticated, "line 39");
  return (
    // <BrowserRouter>
    <>
      <Suspense fallback={<Loading />}>
        <div className="App">
          {/* <Header></Header> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard/*" element={<LoggedHome />}></Route>
            <Route path="/" element={<Login />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/mobile" element={<MobileMenu />} />
          </Routes>
          {/* <Footer></Footer> */}
        </div>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
    // </BrowserRouter>
  );
}

export default App;
