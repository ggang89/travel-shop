import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from "prop-types";
import { logoutUser } from "../../../store/thunkFunctions";

const routes = [
  { to: "/login", name: "로그인", auth: false },
  { to: "/register", name: "회원가입", auth: false },
  { to: "", name: "로그아웃", auth: true },
];

const NavItem = ({mobile}) => {
  const isAuth = useSelector((state) => state.user?.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      dispatch(logoutUser())
        .then(() => {
          navigate("/login");
        });
    } catch (err) {
      console.log(err);
      }
  }

  return (
    <ul className={`text-md justify-center w-full flex gap-4 ${mobile && "flex-col bg-gray-900 h-full"} items-center`}>
      {routes.map(({ to, name, auth }) => {
        if (isAuth !== auth) return null;

        if (name === "로그아웃") {
          return (
            <li key={name} className="py-2 text-center boder-b-4 cursor-pointer">
              <Link onClick={handleLogout}>{name}</Link>
            </li>
          );
        } else {
          return (
            <li
              key={name}
              className="py-2 text-center boder-b-4 cursor-pointer"
            >
              <Link to={to}>{name}</Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default NavItem;

NavItem.propTypes = {
  mobile:PropTypes.bool
}