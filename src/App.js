import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import LoginPage, { action as LoginAction } from "./pages/AuthPages/LoginPage";
import { action as LogoutAction } from "./pages/Logout";
import ErrorPage from "./pages/ErrorPage";
import SignupPage, {
  action as SignupAction,
} from "./pages/AuthPages/SignupPage";
import CartPage from "./pages/UserPages/CartPage";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
          {
            path: "logout",
            action: LogoutAction,
          },
        ],
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
