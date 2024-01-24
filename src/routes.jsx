import { createBrowserRouter, RouterProvider } from "react-router-dom";

// =================> E-COMMERCE ROUTING <===================//
import EcommerceLayout from "./e-commerce/layout/interface/EcommerceLayout";
import Home from "./e-commerce/layout/interface/pages/Home";
import Products from "./e-commerce/layout/interface/pages/Products";
import ProductDetail from "./e-commerce/layout/interface/pages/ProductDetail";
import NotFound from "./e-commerce/layout/interface/pages/NotFound";
import Register from "./e-commerce/layout/interface/pages/Register";

// =================> DASHBOARD ROUTING <===================//
import DashboardLayout from "./dashboard/DashboardLayout";
import Dashboard from "./dashboard/pages/Dashboard";
import Orders from "./dashboard/pages/Orders";
import UserList from "./dashboard/pages/UserList";
import LoginPage from "./dashboard/pages/LoginPage";
import CreateBrand from "./dashboard/pages/CreateBrand";
import CreateAdmin from "./dashboard/pages/CreateAdmin";
import AdminMember from "./dashboard/pages/AdminMember";
import AllBrands from "./dashboard/pages/AllBrands";
import UpdateBrands from "./dashboard/pages/UpdateBrands";
import CreateProducts from "./dashboard/pages/CreateProducts";
import UpdateProduct from "./dashboard/pages/UpdateProduct";
import AllProducts from "./dashboard/pages/AllProducts";

const router = createBrowserRouter([
  // ===> E-COMMERCE ROUTING <===
  {
    path: "/",
    element: <EcommerceLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },

      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product-detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  // ===> DASHBOARD ROUTING <===
  {
    path: "admin",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/orders",
        element: <Orders />,
      },

      {
        path: "/admin/users",
        element: <UserList />,
      },
      {
        path: "/admin/login",
        element: <LoginPage />,
      },
      {
        path: "/admin/create-brand",
        element: <CreateBrand />,
      },
      {
        path: "/admin/all-brands",
        element: <AllBrands />,
      },
      {
        path: "/admin/update-brands",
        element: <UpdateBrands />,
      },
      {
        path: "/admin/create-members",
        element: <CreateAdmin />,
      },
      {
        path: "/admin/members",
        element: <AdminMember />,
      },
      {
        path: "/admin/create-products",
        element: <CreateProducts />,
      },
      {
        path: "/admin/update-products",
        element: <UpdateProduct />,
      },
      {
        path: "/admin/all-products",
        element: <AllProducts />,
      },
    ],
  },
  // ===>  ERROR PAGE <===
  {
    path: "*",
    element: <NotFound />,
  },
]);

export const MainRoutes = () => {
  return <RouterProvider router={router} />;
};
