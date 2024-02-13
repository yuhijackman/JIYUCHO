import {Home, Code2, Presentation} from 'lucide-react'
import Link from 'next/link';

const NAVBAR_ITEMS = [
  {
    title: "Home",
    link: "/",
    icon: Home
  },
  {
    title: "Solved Problems",
    link: "/solved-problems",
    icon: Code2
  },
  {
    title: "Whiteboard",
    link: "/whiteboard",
    icon: Presentation
  }
];

const Navbar = () => {
    return (
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {NAVBAR_ITEMS.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <item.icon
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                  />
                  <span className="ms-3">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    );
}

export default Navbar;