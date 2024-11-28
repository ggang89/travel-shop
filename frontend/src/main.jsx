import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage/index.jsx";
import LoginPage from "./pages/Loginpage/index.jsx";
import RegisterPage from "./pages/RegisterPage/index.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/index.js";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedPage from "./pages/ProtectedPage/index.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import NotAuthRoutes from "./components/NotAuthRoutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },

      // 로그인한 사람만 볼 수 있는 경로
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/protected",
            element: <ProtectedPage />,
          },
        ],
      },

      // 로그인 안 한 사람이 볼 수 있는 경로
      {
        element: <NotAuthRoutes />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
