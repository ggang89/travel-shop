
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage/index.jsx'
import LoginPage from "./pages/Loginpage/index.jsx"
import RegisterPage from './pages/RegisterPage/index.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index:true,
        element:<LandingPage/>,
      },
      {
        path: "/login",
        element:<LoginPage />
      },
      {
        path: "/register",
        element:<RegisterPage/>
      },
  ]
  }
])

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
