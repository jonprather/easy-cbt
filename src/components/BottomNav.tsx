import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import AuthShowcase from "./AuthShowCase";
import { FaPlusCircle } from "react-icons/fa";
const BottomNav = () => {
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
    <div className="btm-nav xs:hidden">
      <Link href="/" className={` ${isHomeActive ? "active" : ""} `}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span className={"btm-nav-label "}>Home</span>
      </Link>
      <Link
        href="/create"
        className={isCreateActive || isUpdateActive ? "active" : ""}
      >
        <span className="text-lg">
          <FaPlusCircle />
        </span>
        <span className={"btm-nav-label"}>
          {isUpdateActive ? "Updating Entry" : "New Entry"}
        </span>
      </Link>
      <div className={isUserActive ? "active" : ""}>
        <AuthShowcase />
      </div>
    </div>
  );
};
// TODO Could make the user settings instead of logout signin etc and make it a page
export default BottomNav;
