import { Routes, Route } from "react-router-dom";

// =================> E-COMMERCE ROUTING <===================//
import EcommerceLayout from "./e-commerce/EcommerceLayout";
import Home from "./e-commerce/pages/Home";
import Categories from "./e-commerce/pages/products/Categories";
import ProductDetail from "./e-commerce/pages/products/ProductDetail";
import BasketPage from "./e-commerce/pages/products/BasketPage";
import Register from "./e-commerce/pages/auth/Register";
import NotFound from "./e-commerce/pages/NotFound";

// =================> DASHBOARD ROUTING <===================//
import DashboardLayout from "./dashboard/DashboardLayout";
import Dashboard from "./dashboard/pages/Dashboard";
import CreateBrand from "./dashboard/pages/brands/CreateBrand";
import AllBrands from "./dashboard/pages/brands/AllBrands";
import UpdateBrands from "./dashboard/pages/brands/UpdateBrands";
import CreateProducts from "./dashboard/pages/products/CreateProducts";
import AllProducts from "./dashboard/pages/products/AllProducts";
import UpdateProduct from "./dashboard/pages/products/UpdateProduct";
import Orders from "./dashboard/pages/products/Orders";
import CreateAdmin from "./dashboard/pages/admin/CreateAdmin";
import AdminMember from "./dashboard/pages/admin/AdminMember";
import LoginPage from "./dashboard/pages/auth/LoginPage";
import ErrorPage from "./dashboard/pages/ErrorPage";
import PrivateRoute from "./dashboard/components/PrivateRoute";
import Contact from "./e-commerce/pages/Contact";
import About from "./e-commerce/pages/About";

export const MainRoutes = () => {
  return (
    // ===> E-COMMERCE ROUTES <===
    <Routes>
      <Route path="/" element={<EcommerceLayout />}>
        <Route index={true} element={<Home />} />
        <Route path="products/:search" element={<Categories />} />
        <Route path="product-detail/:id" element={<ProductDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="basket" element={<BasketPage />} />
        <Route path="register" element={<Register />} />
        <Route />

        {/* ===> E-COMMERCE ERROR PAGE <=== */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ===> DASHBOARD LAYOUT  <=== */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index={true} element={<Dashboard />} />
        <Route path="all-brands" element={<AllBrands />} />
        <Route path="create-brand" element={<CreateBrand />} />
        <Route path="update-brands/:id" element={<UpdateBrands />} />
        <Route path="all-products" element={<AllProducts />} />
        <Route path="orders" element={<Orders />} />
        <Route path="create-products" element={<CreateProducts />} />
        <Route path="update-products/:id" element={<UpdateProduct />} />
        <Route path="create-members" element={<CreateAdmin />} />
        <Route path="members" element={<AdminMember />} />
      </Route>

      {/* ===> LOGIN ADMIN || SUPERADMIN  PAGE <=== */}
      <Route path="/login" element={<LoginPage />} />

      {/* ===> DASHBOARD ERROR PAGE <=== */}
      <Route path="/admin/*" element={<ErrorPage />} />
    </Routes>
  );
};
