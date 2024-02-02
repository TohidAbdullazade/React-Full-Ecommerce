import { Routes, Route } from "react-router-dom";

// =================> E-COMMERCE ROUTING <===================//
import EcommerceLayout from "./e-commerce/EcommerceLayout";
import Home from "./e-commerce/pages/Home";
import ProductList from "./e-commerce/pages/products/ProductList";
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
import RegisterAdmin from "./dashboard/pages/auth/RegisterAdmin";
import ErrorPage from "./dashboard/pages/ErrorPage";
import AdminLogin from "./dashboard/pages/auth/AdminLogin";
import PrivateAdmin from "./dashboard/components/PrivateAdmin";

//import PrivateAdmin from "./dashboard/components/PrivateAdmin";

export const MainRoutes = () => {
  return (
    // ===> E-COMMERCE ROUTES <===
    <Routes>
      <Route path="/" element={<EcommerceLayout />}>
        {/* ===> E-COMMERCE Child Routes <=== */}
        <Route index={true} element={<Home />} />
        <Route path="products" element={<ProductList />} />
        <Route path="product-detail/:id" element={<ProductDetail />} />
        <Route path="basket" element={<BasketPage />} />
        {/* ===> E-COMMERCE Child Routes <=== */}

        {/* E-COMMERCE REGISTER PAGE */}
        <Route path="/register" element={<Register />} />
        {/* E-COMMERCE REGISTER PAGE */}

        {/* ===> E-COMMERCE ERROR PAGE <=== */}
        <Route path="*" element={<NotFound />} />
        {/* ===> E-COMMERCE ERROR PAGE <=== */}
      </Route>

      {/* ===> DASHBOARD ROUTES <=== */}
      <Route path="/admin" element={<DashboardLayout />}>
        {/* ===> DASHBOARD CHILD ROUTES <=== */}
        <Route index={true} element={<Dashboard />} />
        <Route path="all-brands" element={<AllBrands />} />
        <Route path="create-brand" element={<CreateBrand />} />
        <Route path="update-brands" element={<UpdateBrands />} />
        <Route path="all-products" element={<AllProducts />} />
        <Route path="orders" element={<Orders />} />
        <Route path="create-products" element={<CreateProducts />} />
        <Route path="update-products/:id" element={<UpdateProduct />} />
        <Route path="create-members" element={<CreateAdmin />} />
        <Route path="members" element={<AdminMember />} />

        {/* ===> DASHBOARD CHILD ROUTES <=== */}
      </Route>

      {/* ===> LOGIN/REGISTER PAGES <=== */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin-register" element={<RegisterAdmin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      {/* ===> LOGIN/REGISTER PAGES <=== */}

      {/* ===> DASHBOARD ERROR PAGE <=== */}
      <Route path="/*" element={<ErrorPage />} />
      {/* ===> DASHBOARD ERROR PAGE <=== */}
    </Routes>
  );
};
