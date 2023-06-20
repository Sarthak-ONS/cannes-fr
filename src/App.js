import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import ProductsPage, { loader as ProductLoader } from "./pages/Products";
import LoginPage, { action as LoginAction } from "./pages/AuthPages/LoginPage";
import { action as LogoutAction } from "./pages/Logout";
import ErrorPage from "./pages/ErrorPage";
import SignupPage, {
  action as SignupAction,
} from "./pages/AuthPages/SignupPage";
import CartPage from "./pages/UserPages/CartPage";

import { tokenLoader } from "./utils/isAuth";
import AuthProvider from "./store/AuthProvider";
import CartProvider from "./store/CartProvider";
import ProductDescriptionPage, {
  loader as ProductDescriptionPageLoader,
} from "./pages/ProductDescriptionPage";
import ProfilePage, {
  loader as ProfilePageLoader,
  action as ProfilePageAction,
} from "./pages/UserPages/Profile";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        loader: ProductLoader,
        element: <ProductsPage />,
      },
      {
        path: "products/:productId",
        loader: ProductDescriptionPageLoader,
        element: <ProductDescriptionPage />,
      },
      {
        path: "auth",
        children: [
          {
            path: "login",
            action: LoginAction,
            element: <LoginPage />,
          },
          {
            path: "signup",
            action: SignupAction,
            element: <SignupPage />,
          },
        ],
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "account",
        loader: ProfilePageLoader,
        action: ProfilePageAction,
        element: <ProfilePage />,
      },
      {
        path: "/logout",
        action: LogoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
