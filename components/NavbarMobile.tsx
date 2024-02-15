import Link from "next/link";
import ProductLogo from "./ProductLogo";
import { PRODUCT_ITEMS } from "@/app/config";
import { LogIn, LogOut, UserPlus } from "lucide-react";

const NavbarMobile = () => {
  return (
    <div className="flex flex-col items-center h-full">
      <ProductLogo className="p-2 mb-4" type="short" />
      <ul className="space-y-2">
        {PRODUCT_ITEMS.map((item, index) => (
          <li key={index}>
            <Link
              href={item.link}
              className="flex items-center p-2 text-white rounded-lg hover:bg-primary group"
            >
              <item.icon
                className="w-6 h-6 text-primary transition duration-75 group-hover:text-white"
                aria-label={`Link to ${item.title}`}
              />
            </Link>
          </li>
        ))}
      </ul>
      <ul className="space-y-2 pb-2 mt-auto">
        <li>
          <Link
            href="/"
            className="flex items-center p-2 text-white rounded-lg hover:bg-primary group"
          >
            <LogIn
              className="w-6 h-6 text-primary transition duration-75 group-hover:text-white"
              aria-label="Link to Sign in"
            />
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center p-2 text-white rounded-lg hover:bg-primary group"
          >
            <LogOut
              className="w-6 h-6 text-primary transition duration-75 group-hover:text-white"
              aria-label="Link to Sign out"
            />
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center p-2 text-white rounded-lg hover:bg-primary group"
          >
            <UserPlus
              className="w-6 h-6 text-primary transition duration-75 group-hover:text-white"
              aria-label="Link to Sign up"
            />
          </Link>
        </li>
        <li className="flex rounded-sm items-center bg-slate-700 p-2">
          <img
            className="w-6 h-6 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt-JmDfLz7ErRiTZ9vIme55A9JGQqdx8qJ_xQ_lB2UIqGAFELpsKQQ8xuTSrlqrly-tSQ&usqp=CAU"
            alt="User Thumbnail"
          />
        </li>
      </ul>
    </div>
  );
};

export default NavbarMobile;
