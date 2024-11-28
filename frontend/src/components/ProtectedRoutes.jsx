import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoutes = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;

//'isAuth' is missing in props validation
ProtectedRoutes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};
