import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

const NotAuthRoutes = () => {
  const isAuth = useSelector((state) => state.user?.isAuth);
  return isAuth ? <Navigate to={"/"} /> : <Outlet />;
};

export default NotAuthRoutes;
