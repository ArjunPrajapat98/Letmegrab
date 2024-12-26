import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routers } from "./App";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import 'swiper/css';           // Core Swiper styles
import 'swiper/css/navigation'; // Navigation module styles (optional)
import 'swiper/css/pagination'; // Pagination module styles (optional)

const root = createRoot(document.getElementById("root"));
root.render(
  <>
    <ToastContainer />
    <RouterProvider router={routers} />
  </>
);
