import Link from "next/link";
import ProductLogo from "./ProductLogo";
import { PRODUCT_ITEMS } from "@/app/config";
import { LogIn, LogOut, UserPlus } from "lucide-react";

const NavbarPC = () => {
  return (
    <div className="flex flex-col h-full">
      <ProductLogo className="p-2 mb-5" type="full" />
      <ul className="space-y-2">
        {PRODUCT_ITEMS.map((item, index) => (
          <li key={index}>
            <Link
              href={item.link}
              className="flex items-center p-2 text-white rounded-lg hover:bg-primary group"
            >
              <item.icon
                className="w-5 h-5 text-primary transition duration-75 group-hover:text-white"
                aria-hidden="true"
              />
              <span className="ms-3 font-medium">{item.title}</span>
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
              className="w-5 h-5 text-primary transition duration-75 group-hover:text-white"
              aria-hidden="true"
            />
            <span className="ms-3 font-medium">Sign in</span>
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center p-2 text-white rounded-lg hover:bg-primary group"
          >
            <LogOut
              className="w-5 h-5 text-primary transition duration-75 group-hover:text-white"
              aria-hidden="true"
            />
            <span className="ms-3 font-medium">Sign out</span>
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center p-2 text-white rounded-lg hover:bg-primary group"
          >
            <UserPlus
              className="w-5 h-5 text-primary transition duration-75 group-hover:text-white"
              aria-hidden="true"
            />
            <span className="ms-3 font-medium">Sign up</span>
          </Link>
        </li>
        <li className="flex rounded-sm items-center gap-4 bg-slate-700 p-2">
          <img
            className="w-10 h-10 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt-JmDfLz7ErRiTZ9vIme55A9JGQqdx8qJ_xQ_lB2UIqGAFELpsKQQ8xuTSrlqrly-tSQ&usqp=CAU"
            alt="User Thumbnail"
          />
          <div className="font-medium text-white">
            <span>Jese Leos</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NavbarPC;
