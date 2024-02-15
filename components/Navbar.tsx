import Link from "next/link";
import ProductLogo from "./ProductLogo";
import NavbarPC from "./NavbarPC";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 h-screen bg-[#2e2e48]"
      aria-label="Sidebar"
    >
      <div className="h-full">
        <div className="hidden md:block h-full w-64 px-3 py-4 overflow-y-auto">
          <NavbarPC />
        </div>
        <div className="flex justify-center h-full px-3 py-4 md:hidden w-14">
          <NavbarMobile />
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
