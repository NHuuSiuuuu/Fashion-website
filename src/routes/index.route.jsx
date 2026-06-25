import { lazy } from "react";
import LayoutDefault from "../components/layout/LayoutDefault";
import LayoutDefaultAdmin from "@/components/admin/layout/LayoutDefault";
import Login from "@/pages/client/account/Login";
import Register from "@/pages/client/account/Register";
import Checkout from "@/pages/client/Checkouts";
import OrderSuccess from "@/pages/client/orders/OrderSuccess";
import OrderTracking from "@/pages/client/tracking/Tracking";
import OrderDetailPage from "@/pages/admin/orders/OrderDetailAdmin";
import Account from "@/pages/client/account/Account";
import AuthRedirect from "@/components/admin/layout/AuthRedirect";
import ProtectedRoute from "@/components/protected-route/ProtectedRoute";
import AuthRoute from "@/components/protected-route/AuthRoute";
import AdminRoute from "@/components/protected-route/AdminRoute";
import NotFound from "@/pages/NotFound";

const HomePage = lazy(() => import("../pages/HomePage"));
const ProductDetail = lazy(
  () => import("../components/products/ProductDetail"),
);

const Collection = lazy(() => import("../components/products/Products"));
const Cart = lazy(() => import("../components/products/Cart"));

const ProducstNew = lazy(() => import("@/pages/client/products/ProductsNew"));
const OrderDetail = lazy(() => import("@/pages/client/orders/OrderDetail"));
const Contact = lazy(() => import("@/pages/client/contact/Contact"));

// admin

const DashBoard = lazy(() => import("@/pages/admin/DashBoard"));

const ProductAdmin = lazy(() => import("@/pages/admin/product/ProductAdmin"));

const ProductCreateAdmin = lazy(
  () => import("@/pages/admin/product/ProductCreateAdmin"),
);

const ProductUpdateAdmin = lazy(
  () => import("@/pages/admin/product/ProductUpdateAdmin"),
);

const ProductDetailAdmin = lazy(
  () => import("@/pages/admin/product/ProductDetailAdmin"),
);

const CategoryAdmin = lazy(
  () => import("@/pages/admin/category-product/CategoryAdmin"),
);

const CategoryUpdateAdmin = lazy(
  () => import("@/pages/admin/category-product/CategoryUpdateAdmin"),
);

const CategoryCreateAdmin = lazy(
  () => import("@/pages/admin/category-product/CategoryCreateAdmin"),
);

const CategoryDetail = lazy(
  () => import("@/pages/admin/category-product/CategoryDetail"),
);

const Roles = lazy(() => import("@/pages/admin/roles/Roles"));

const RoleCreate = lazy(() => import("@/pages/admin/roles/RoleCreate"));

const RoleUpdate = lazy(() => import("@/pages/admin/roles/RoleUpdate"));

const RoleDetail = lazy(() => import("@/pages/admin/roles/RoleDetail"));

const RolePermissions = lazy(
  () => import("@/pages/admin/roles/RolePermissions"),
);

const AccountAdmin = lazy(() => import("@/pages/admin/accounts/AccountAdmin"));

const AccountCreateAdmin = lazy(
  () => import("@/pages/admin/accounts/AccountCreateAdmin"),
);

const AccountUpdateAdmin = lazy(
  () => import("@/pages/admin/accounts/AccountUpdateAdmin"),
);

const AccountDetail = lazy(
  () => import("@/pages/admin/accounts/AccountDetail"),
);

const AccountMeAdmin = lazy(
  () => import("@/pages/admin/accounts/AccountMeAdmin"),
);

const LoginAdmin = lazy(() => import("@/pages/admin/auth/LoginAdmin"));

const ShippingMethod = lazy(
  () => import("@/pages/admin/shipping_method/ShippingMethod"),
);
const ShippingMethodCreate = lazy(
  () => import("@/pages/admin/shipping_method/ShippingMethodCreate"),
);
const ShippingMethodDetail = lazy(
  () => import("@/pages/admin/shipping_method/ShippingMethodDetail"),
);

const ShippingMethodUpdate = lazy(
  () => import("@/pages/admin/shipping_method/ShippingMethodUpdate"),
);

const Orders = lazy(() => import("@/pages/admin/orders/order"));

const AdminOrderDetail = lazy(
  () => import("@/pages/admin/orders/OrderDetailAdmin"),
);
export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <Collection />,
      },
      {
        path: "/products/san-pham-moi",
        element: <ProducstNew />,
      },
      {
        path: "cart/",
        element: <Cart />,
      },

      {
        path: "products/:slug",
        element: <ProductDetail />,
      },

      {
        path: "tracking",
        element: <OrderTracking />,
      },
      {
        path: "contact",
        element: <Contact />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "account",
            element: <Account />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthRoute />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "checkouts/:cart_id",
    element: <Checkout />,
  },
  {
    path: "orders/success/:id",
    element: <OrderSuccess />,
  },
  {
    path: "orders/detail/:id",
    element: <OrderDetail />,
  },

  {
    path: "/admin",
    element: <AuthRoute />,
    children: [
      {
        path: "login",
        element: <LoginAdmin />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminRoute />,
    children: [
      {
        element: <LayoutDefaultAdmin />,
        children: [
          {
            index: true,
            element: <DashBoard />,
          },
          {
            path: "products",
            element: <ProductAdmin />,
          },
          {
            path: "product/create",
            element: <ProductCreateAdmin />,
          },
          {
            path: "product/update/:id",
            element: <ProductUpdateAdmin />,
          },
          {
            path: "product/detail/:id",
            element: <ProductDetailAdmin />,
          },
          {
            path: "products-category",
            element: <CategoryAdmin />,
          },
          {
            path: "product-category/update/:id",
            element: <CategoryUpdateAdmin />,
          },
          {
            path: "product-category/create",
            element: <CategoryCreateAdmin />,
          },
          {
            path: "product-category/detail/:id",
            element: <CategoryDetail />,
          },
          {
            path: "roles/",
            element: <Roles />,
          },
          {
            path: "roles/create",
            element: <RoleCreate />,
          },
          {
            path: "roles/update/:id",
            element: <RoleUpdate />,
          },
          {
            path: "roles/detail/:id",
            element: <RoleDetail />,
          },
          {
            path: "roles/permissions",
            element: <RolePermissions />,
          },
          {
            path: "accounts",
            element: <AccountAdmin />,
          },
          {
            path: "accounts/me",
            element: <AccountMeAdmin />,
          },
          {
            path: "accounts/create",
            element: <AccountCreateAdmin />,
          },
          {
            path: "accounts/update/:id",
            element: <AccountUpdateAdmin />,
          },
          {
            path: "accounts/detail/:id",
            element: <AccountDetail />,
          },
          {
            path: "shipping-method",
            element: <ShippingMethod />,
          },
          {
            path: "shipping-method/create",
            element: <ShippingMethodCreate />,
          },
          {
            path: "shipping-method/detail/:id",
            element: <ShippingMethodDetail />,
          },
          {
            path: "shipping-method/update/:id",
            element: <ShippingMethodUpdate />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "order/:id",
            element: <AdminOrderDetail />,
          },
        ],
      },
    ],
  },
];
