import { useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./Sections/NavItem";

const NavBar = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  }
  return (
    <nav className="relative z-10 text-white bg-gray-900">
      <div className="w-full">
        <div className="flex items-center justify-between mx-5 sm:mx-10 lg:mx-20">
          {/* logo */}
          <div className="flex items-center text-2xl h-14">
          <Link to="/">Logo</Link>
          </div>

          {/* 메뉴 버튼 */}
          <div className="text-2xl sm:hidden">
            <button onClick={handleMenu}>{menu?"-":"+"}</button>
          </div>

          {/* 큰 사이즈 아이템 */}
          <div className="hidden sm:block">
            <NavItem/>
        </div>
          
        </div>

        {/* 모바일 사이즈용 */}
        <div className="block sm:hidden">
          {menu && <NavItem mobile/>}
        </div>
      </div>
    </nav>
  );
}

export default NavBar