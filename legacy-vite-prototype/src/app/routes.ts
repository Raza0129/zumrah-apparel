import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { LandingPage } from "./components/pages/LandingPage";
import { ShopPage } from "./components/pages/ShopPage";
import { ProductDetailPage } from "./components/pages/ProductDetailPage";
import { DesignerPage } from "./components/pages/DesignerPage";
import { CartPage } from "./components/pages/CartPage";
import { CheckoutPage } from "./components/pages/CheckoutPage";
import { AccountPage } from "./components/pages/AccountPage";
import { AdminPage } from "./components/pages/AdminPage";
import { AuthPage } from "./components/pages/AuthPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: LandingPage },
      { path: "shop", Component: ShopPage },
      { path: "shop/:id", Component: ProductDetailPage },
      { path: "designer", Component: DesignerPage },
      { path: "designer/:id", Component: DesignerPage },
      { path: "cart", Component: CartPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "account", Component: AccountPage },
      { path: "account/:tab", Component: AccountPage },
      { path: "admin", Component: AdminPage },
      { path: "admin/:tab", Component: AdminPage },
      { path: "login", Component: AuthPage },
      { path: "register", Component: AuthPage },
    ],
  },
]);
