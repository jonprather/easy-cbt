import React from "react";
import AuthShowCase from "./AuthShowCase";
import Link from "next/link";
const Navbar: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-between bg-primary p-4 text-lg">
      <div className="flex-1">Logo</div>
      <div className="flex items-center">
        <Link className="mr-6 text-white" href="/">
          Home
        </Link>
        <Link className=" mr-6 text-white" href="/easyCBT">
          App
        </Link>
        {/* <button className="bg-white py-2 px-4 text-teal-900">Sign In</button> */}
        <AuthShowCase />
      </div>
    </div>
  );
};

export default Navbar;
