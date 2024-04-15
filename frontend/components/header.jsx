import React from "react";
import axios from "axios";

function Navbar() {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      await axios.post("http://127.0.0.1:8000/api/logout",{}, { headers });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <header className="py-4 px-4 sm:px-10 z-50 min-h-[70px]">
      <div className="relative flex flex-wrap items-center gap-4">
        <a href="">
          <img src="./src/assets/voyage.jpg" alt="logo" className=" w-16 h-16" />
        </a>
        <div className="flex ml-auto lg:order-1">
          <button
            className="px-6 py-3 rounded-xl text-white bg-cyan-700 transition-all hover:bg-cyan-800"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button id="toggle" className="lg:hidden ml-7">
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
            </svg>
          </button>
        </div>
        <ul
          id="collapseMenu"
          className="lg:!flex lg:ml-12 lg:space-x-6 max-lg:space-y-6 max-lg:hidden max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[250px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto max-lg:z-50"
        >
          {/* <li className="max-lg:border-b max-lg:py-2 px-3">
            <a
              href=""
              className="lg:hover:text-blue-600 text-blue-600 block font-bold transition-all"
            >
              Home
            </a>
          </li> */}

          <li className="max-lg:border-b max-lg:py-2 px-3">
            <a
              href=""
              className="lg:hover:text-blue-600 block font-bold transition-all"
            >
              Itineraire
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
