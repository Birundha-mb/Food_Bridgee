import {
  FaHome,
  FaDonate,
  FaMapMarkedAlt,
  FaUserShield,
  FaComments,
} from "react-icons/fa";

import {
  Link,
  useLocation,
} from "react-router-dom";

export default function Sidebar() {

  const location = useLocation();

  // Get currently logged-in user
  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem("user") || "null"
    );
  } catch (error) {
    console.error(
      "Invalid user data:",
      error
    );
  }

  const isAdmin =
    user?.role?.toLowerCase() === "admin";


  const menuItem =
    "p-4 rounded-2xl flex items-center gap-4 text-lg transition";

  const activeItem =
    "bg-green-600 shadow-md";

  const inactiveItem =
    "hover:bg-green-600";


  return (

    <div className="w-[260px] h-screen bg-green-700 text-white fixed left-0 top-0 p-6">

      {/* LOGO */}

      <Link
        to={
          isAdmin
            ? "/admin"
            : "/dashboard"
        }
        className="block"
      >

        <h1 className="text-4xl font-bold mb-12">
          FoodBridge
        </h1>

      </Link>


      {/* MENU */}

      <div className="flex flex-col gap-3">


        {/* DASHBOARD */}

        <Link
          to="/dashboard"
          className={`${menuItem} ${
            location.pathname === "/dashboard"
              ? activeItem
              : inactiveItem
          }`}
        >

          <FaHome />

          <span>
            Dashboard
          </span>

        </Link>


        {/* DONATE */}

        <Link
          to="/donate"
          className={`${menuItem} ${
            location.pathname === "/donate"
              ? activeItem
              : inactiveItem
          }`}
        >

          <FaDonate />

          <span>
            Donate
          </span>

        </Link>


        {/* CHAT */}

        <Link
          to="/chat"
          className={`${menuItem} ${
            location.pathname === "/chat"
              ? activeItem
              : inactiveItem
          }`}
        >

          <FaComments />

          <span>
            Chat
          </span>

        </Link>


        {/* TRACKING */}

        <Link
          to="/tracking"
          className={`${menuItem} ${
            location.pathname === "/tracking"
              ? activeItem
              : inactiveItem
          }`}
        >

          <FaMapMarkedAlt />

          <span>
            Tracking
          </span>

        </Link>


        {/* ADMIN */}

        {isAdmin && (

          <Link
            to="/admin"
            className={`${menuItem} ${
              location.pathname === "/admin"
                ? activeItem
                : inactiveItem
            }`}
          >

            <FaUserShield />

            <span>
              Admin
            </span>

          </Link>

        )}

      </div>


      {/* USER ROLE */}

      <div className="absolute bottom-6 left-6 right-6">

        <div className="bg-green-800 rounded-2xl p-4">

          <p className="text-xs text-green-200">
            Signed in as
          </p>

          <p className="font-semibold mt-1 truncate">
            {user?.name || "FoodBridge User"}
          </p>

          <p className="text-xs text-green-200 mt-1 capitalize">
            {user?.role || "User"}
          </p>

        </div>

      </div>

    </div>

  );
}