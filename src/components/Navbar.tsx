import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import AuthShowCase from "./AuthShowCase";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
const Navbar: React.FC = () => {
  const router = useRouter();
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isCreateActive, setIsCreateActive] = useState(false);
  const [isUpdateActive, setIsUpdateActive] = useState(false);

  const [isUserActive, setIsUserActive] = useState(false);

  useEffect(() => {
    if (router.pathname === "/") {
      setIsHomeActive(true);
      setIsCreateActive(false);
      setIsUserActive(false);
      setIsUpdateActive(false);
    } else if (router.pathname === "/create") {
      setIsHomeActive(false);
      setIsCreateActive(true);
      setIsUserActive(false);
      setIsUpdateActive(false);
    } else if (router.pathname === "/user") {
      setIsHomeActive(false);
      setIsCreateActive(false);
      setIsUserActive(true);
      setIsUpdateActive(false);
    } else if (router.pathname.startsWith("/update")) {
      setIsHomeActive(false);
      setIsCreateActive(false);
      setIsUserActive(false);
      setIsUpdateActive(true);
    }
  }, [router.pathname]);

  return (
    <div className="hidden w-full items-center justify-between bg-neutral p-4 text-lg sm:flex ">
      <div className="flex-1">Logo</div>
      <div className="flex items-center">
        <Link
          className={`btn-ghost active btn mr-6 flex items-center text-white ${
            isHomeActive
              ? "rounded-b-none border-b-primary text-primary hover:rounded-lg"
              : ""
          } `}
          href="/"
        >
          <span className={` mr-2 text-lg `}>
            <FaHome></FaHome>
          </span>
          Home
        </Link>
        <Link
          className={`btn-ghost btn mr-6 text-white ${
            isCreateActive
              ? "rounded-b-none border-b-primary text-primary hover:rounded-lg"
              : ""
          } `}
          href="/create"
        >
          New Entry
        </Link>
        <AuthShowCase />
      </div>
    </div>
  );
};

export default Navbar;
